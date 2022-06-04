class DrawQuadCurve extends PaintFunction {
  constructor(ctxReal, ctxDraft) {
    super();
    this.ctxReal = ctxReal;
    this.ctxDraft = ctxDraft;
    this.ctxReal.strokeStyle = $("#color").val();
    this.clickCount = 0;
    this.ctxReal.globalCompositeOperation = "source-over";
  }

  onMouseDown(cor, e) {
    if (head === "round") {
      this.ctxReal.lineCap = "round";
      this.ctxReal.lineJoin = "round";
      this.ctxDraft.lineCap = "round";
      this.ctxDraft.lineJoin = "round";
    } else {
      this.ctxReal.lineJoin = "miter";
      this.ctxReal.lineCap = "square";
      this.ctxDraft.lineCap = "square";
      this.ctxDraft.lineJoin = "miter";
    }
    if (this.clickCount === 0) {
      this.corX = cor[0];
      this.corY = cor[1];
    } else {
      return;
    }
  }

  onDragging(cor, e) {
    if (this.clickCount === 0) {
      this.drawLine(this.ctxDraft, [cor[0], cor[1]]);
    } else {
      this.drawQuadCurve(this.ctxDraft, [cor[0], cor[1]]);
    }
  }

  onMouseUp(cor, e) {
    if (this.clickCount === 0) {
      this.endX = cor[0];
      this.endY = cor[1];
      this.drawLine(this.ctxDraft, [this.endX, this.endY]);
      this.clickCount++;
    } else {
      this.drawQuadCurve(this.ctxReal, [cor[0], cor[1]]);
      this.clickCount = 0;
      saveImg();
    }
  }

  onMouseEnter(cor, e) {
    $("#canvas-draft").css("cursor", "crosshair");
  }

  onMouseLeave(cor, e) {
    $("#canvas-draft").css("cursor", "default");
  }
  
  drawQuadCurve(canvas, cp) {
    clearRect(this.ctxDraft);
    canvas.beginPath();
    canvas.moveTo(this.corX, this.corY);
    canvas.quadraticCurveTo(cp[0], cp[1], this.endX, this.endY);
    canvas.stroke();
    canvas.closePath();
  }

  drawLine(canvas, cor) {
    clearRect(this.ctxDraft);
    canvas.beginPath();
    canvas.moveTo(this.corX, this.corY);
    canvas.lineTo(cor[0], cor[1]);
    canvas.moveTo(cor[0], cor[1]);
    canvas.closePath();
    canvas.stroke();
  }
}
