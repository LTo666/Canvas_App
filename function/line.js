class DrawLine extends PaintFunction {
  constructor(ctxReal, ctxDraft) {
    super();
    this.ctxReal = ctxReal;
    this.ctxDraft = ctxDraft;
    this.ctxReal.strokeStyle = $("#color").val();
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
    this.corX = cor[0];
    this.corY = cor[1];
  }

  onDragging(cor, e) {
    this.drawLine(this.ctxDraft, [cor[0], cor[1]]);
  }

  onMouseUp(cor, e) {
    this.drawLine(this.ctxReal, [cor[0], cor[1]]);
    saveImg();
  }

  onMouseEnter(cor, e) {
    $("#canvas-draft").css("cursor", "crosshair");
  }

  onMouseLeave(cor, e) {
    $("#canvas-draft").css("cursor", "default");
  }
  
  drawLine(canvas, cor) {
    clearRect(this.ctxDraft);
    canvas.beginPath();
    canvas.moveTo(this.corX, this.corY);
    canvas.lineTo(cor[0], cor[1]);
    canvas.closePath();
    canvas.stroke();
  }
}
