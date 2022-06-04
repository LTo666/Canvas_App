class DrawCircle extends PaintFunction {
  constructor(ctxReal, ctxDraft) {
    super();
    this.ctxReal = ctxReal;
    this.ctxDraft = ctxDraft;
    this.ctxReal.lineWidth = 0;
    this.ctxReal.globalCompositeOperation = "source-over";
  }

  onMouseDown(cor, e) {
    this.ctxReal.lineCap = "round";
    this.ctxReal.lineJoin = "round";
    this.ctxDraft.lineCap = "round";
    this.ctxDraft.lineJoin = "round";
    if (parseInt($("#pen-range").val()) - 2 <= 0) {
      this.ctxReal.strokeStyle = $("#fill-color").val();
    } else {
      this.ctxReal.strokeStyle = $("#color").val();
    }
    this.corX = cor[0];
    this.corY = cor[1];
  }

  onDragging(cor, e) {
    if (e.shiftKey) {
      this.drawCircle(this.ctxDraft, [cor[0], cor[1]]);
    } else {
      this.drawEllipse(this.ctxDraft, [cor[0], cor[1]]);
    }
  }

  onMouseUp(cor, e) {
    if (e.shiftKey) {
      this.drawCircle(this.ctxReal, [cor[0], cor[1]]);
    } else {
      this.drawEllipse(this.ctxReal, [cor[0], cor[1]]);
    }
    saveImg();
  }

  onMouseEnter(cor, e) {
    $("#canvas-draft").css("cursor", "crosshair");
  }

  onMouseLeave(cor, e) {
    $("#canvas-draft").css("cursor", "default");
  }
  
  drawCircle(canvas, cor) {
    clearRect(this.ctxDraft);
    canvas.beginPath();
    let r = Math.sqrt((this.corX - cor[0]) ** 2 + (this.corY - cor[1]) ** 2);
    canvas.arc(this.corX, this.corY, r, 0, 2 * Math.PI);
    canvas.fill();
    canvas.stroke();
    canvas.closePath();
  }

  drawEllipse(canvas, cor) {
    clearRect(this.ctxDraft);
    canvas.beginPath();
    canvas.ellipse(
      this.corX,
      this.corY,
      Math.abs(this.corX - cor[0]),
      Math.abs(this.corY - cor[1]),
      Math.PI / 4,
      0,
      2 * Math.PI
    );
    canvas.fill();
    canvas.stroke();
    canvas.closePath();
  }
}
