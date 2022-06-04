class DrawBezierCurve extends PaintFunction {
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
    } else if (this.clickCount === 1) {
      return;
    } else {
      return;
    }
  }

  onDragging(cor, e) {
    if (this.clickCount === 0) {
      this.drawLine(this.ctxDraft, [cor[0], cor[1]]);
    } else if (this.clickCount === 1) {
      this.drawBerzierCurve(
        this.ctxDraft,
        [cor[0], cor[1]],
        [this.endX, this.endY]
      );
    } else {
      this.drawBerzierCurve(
        this.ctxDraft,
        [this.cp1X, this.cp1Y],
        [cor[0], cor[1]]
      );
    }
  }

  onMouseUp(cor, e) {
    if (this.clickCount === 0) {
      this.endX = cor[0];
      this.endY = cor[1];
      this.drawLine(this.ctxDraft, [this.endX, this.endY]);
      this.clickCount++;
    } else if (this.clickCount === 1) {
      this.cp1X = cor[0];
      this.cp1Y = cor[1];
      this.drawBerzierCurve(
        this.ctxDraft,
        [this.cp1X, this.cp1Y],
        [this.endX, this.endY]
      );
      this.clickCount++;
    } else {
      this.drawBerzierCurve(
        this.ctxReal,
        [this.cp1X, this.cp1Y],
        [cor[0], cor[1]]
      );
      this.clickCount = 0;
      saveImg();
    }
  }

  onMouseEnter(cor, e) {
    $(".canvas").css("cursor", "crosshair");
  }

  onMouseLeave(cor, e) {
    $("#canvas-draft").css("cursor", "default");
  }

  drawBerzierCurve(canvas, cp1, cp2) {
    clearRect(this.ctxDraft);
    canvas.beginPath();
    canvas.moveTo(this.corX, this.corY);
    canvas.bezierCurveTo(cp1[0], cp1[1], cp2[0], cp2[1], this.endX, this.endY);
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
