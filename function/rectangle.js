class DrawRectangle extends PaintFunction {
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
      this.drawSquare(this.ctxDraft, [cor[0], cor[1]]);
    } else {
      this.drawRectangle(this.ctxDraft, [cor[0], cor[1]]);
    }
  }

  onMouseUp(cor, e) {
    if (e.shiftKey) {
      this.drawSquare(this.ctxReal, [cor[0], cor[1]]);
    } else {
      this.drawRectangle(this.ctxReal, [cor[0], cor[1]]);
    }
    saveImg();
  }

  onMouseEnter(cor, e) {
    $("#canvas-draft").css("cursor", "crosshair");
  }

  onMouseLeave(cor, e) {
    $("#canvas-draft").css("cursor", "default");
  }
  
  drawRectangle(canvas, cor) {
    clearRect(this.ctxDraft);
    canvas.strokeRect(
      this.corX,
      this.corY,
      cor[0] - this.corX,
      cor[1] - this.corY
    );
    canvas.fillRect(
      this.corX,
      this.corY,
      cor[0] - this.corX,
      cor[1] - this.corY
    );
  }

  drawSquare(canvas, cor) {
    clearRect(this.ctxDraft);
    canvas.strokeRect(
      this.corX,
      this.corY,
      Math.abs(cor[1] - this.corY),
      cor[1] - this.corY
    );
    canvas.fillRect(
      this.corX,
      this.corY,
      Math.abs(cor[1] - this.corY),
      cor[1] - this.corY
    );
  }
}
