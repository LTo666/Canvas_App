class DrawTriangle extends PaintFunction {
  constructor(ctxReal, ctxDraft) {
    super();
    this.ctxReal = ctxReal;
    this.ctxDraft = ctxDraft;
    this.ctxReal.globalCompositeOperation = "source-over";
  }

  onMouseDown(cor, e) {
    if (parseInt($("#pen-range").val()) - 2 <= 0) {
      this.ctxReal.strokeStyle = $("#fill-color").val();
    } else {
      this.ctxReal.strokeStyle = $("#color").val();
    }
    if (head === "round") {
      this.ctxReal.lineCap = "round";
      this.ctxReal.lineJoin = "round";
      this.ctxDraft.lineCap = "round";
      this.ctxDraft.lineJoin = "round";
    } else {
      this.ctxReal.lineJoin = "miter";
      this.ctxReal.lineCap = "butt";
      this.ctxDraft.lineCap = "butt";
      this.ctxDraft.lineJoin = "miter";
    }
    this.corX = cor[0];
    this.corY = cor[1];
  }

  onDragging(cor, e) {
    if (e.shiftKey) {
      this.drawEquTri(this.ctxDraft, [cor[0], cor[1]]);
    } else {
      this.drawIsoTri(this.ctxDraft, [cor[0], cor[1]]);
    }
  }

  onMouseUp(cor, e) {
    if (e.shiftKey) {
      this.drawEquTri(this.ctxReal, [cor[0], cor[1]]);
    } else {
      this.drawIsoTri(this.ctxReal, [cor[0], cor[1]]);
    }
    saveImg();
  }

  onMouseEnter(cor, e) {
    $("#canvas-draft").css("cursor", "crosshair");
  }

  onMouseLeave(cor, e) {
    $("#canvas-draft").css("cursor", "default");
  }
  
  drawIsoTri(canvas, cor) {
    clearRect(this.ctxDraft);
    canvas.beginPath();
    if (cor[0] > this.corX) {
      canvas.moveTo(this.corX, this.corY);
      canvas.lineTo(cor[0], cor[1]);
      canvas.lineTo(this.corX - Math.abs(this.corX - cor[0]), cor[1]);
      canvas.closePath();
      canvas.stroke();
      canvas.fill();
    } else {
      canvas.moveTo(this.corX, this.corY);
      canvas.lineTo(cor[0], cor[1]);
      canvas.lineTo(this.corX + Math.abs(this.corX - cor[0]), cor[1]);
      canvas.closePath();
      canvas.stroke();
      canvas.fill();
    }
  }

  drawEquTri(canvas, cor) {
    clearRect(this.ctxDraft);
    canvas.beginPath();
    canvas.moveTo(this.corX, this.corY);
    let oppSide = Math.abs(this.corY - cor[1]);
    let nearSide = oppSide / Math.sqrt(3);
    canvas.lineTo(this.corX - nearSide, cor[1]);
    canvas.lineTo(this.corX + nearSide, cor[1]);
    canvas.closePath();
    canvas.stroke();
    canvas.fill();
  }
}
