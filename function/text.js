class AddText extends PaintFunction {
  constructor(ctxReal, ctxDraft) {
    super();
    this.ctxReal = ctxReal;
    this.ctxDraft = ctxDraft;
    this.ctxReal.fillStyle = $("#color").val();
    this.ctxDraft.lineWidth = 2;
    this.fontSize = parseInt($("#pen-range").val());
    this.ctxReal.globalCompositeOperation = "source-over";
  }

  onMouseDown(cor, e) {
    this.corX = cor[0];
    this.corY = cor[1];
  }

  onDragging(cor, e) {
    this.drawRectangle(this.ctxDraft, [cor[0], cor[1]]);
  }

  onMouseUp(cor, e) {
    clearRect(this.ctxDraft);
    this.endX = cor[0];
    this.endY = cor[1];
    $("#input-text").css("display", "block");
    if (this.endX > this.corX && this.endY > this.corY) {
      this.ptX = this.corX;
      this.ptY = this.corY;
    } else if (this.endX < this.corX && this.endY < this.corY) {
      this.ptX = this.endX;
      this.ptY = this.endY;
    } else if (this.endX > this.corX && this.endY < this.corY) {
      this.ptX = this.corX;
      this.ptY = this.endY;
    } else {
      this.ptX = this.endX;
      this.ptY = this.corY;
    }
    $("#input-text").css("margin-top", `${this.ptY}px`);
    $("#input-text").css("margin-left", `${this.ptX}px`);
    $("#input-text").css("width", `${Math.abs(this.corX - this.endX)}px`);
    $("#input-text").css("height", `${Math.abs(this.corY - this.endY)}px`);
    $("#input-text").css("font-size", `${this.fontSize + 22}px`);
  }

  drawRectangle(canvas, cor) {
    clearRect(this.ctxDraft);
    canvas.strokeRect(
      this.corX,
      this.corY,
      cor[0] - this.corX,
      cor[1] - this.corY
    );
  }
}
