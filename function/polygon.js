class DrawPolygon extends PaintFunction {
  constructor(ctxReal, ctxDraft) {
    super();
    this.ctxReal = ctxReal;
    this.ctxDraft = ctxDraft;
    this.drawing = false;
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
      this.ctxReal.lineCap = "butt";
      this.ctxDraft.lineCap = "butt";
      this.ctxDraft.lineJoin = "miter";
    }
    if (this.drawing === false) {
      this.ctxReal.beginPath();
      this.startX = cor[0];
      this.startY = cor[1];
    } else {
    }
  }

  onDragging(cor, e) {
    if (this.drawing === false) {
      this.drawLine(
        this.ctxDraft,
        [this.startX, this.startY],
        [cor[0], cor[1]]
      );
    } else if (this.drawing === true) {
      this.drawLine(this.ctxDraft, [this.endX, this.endY], [cor[0], cor[1]]);
    }
  }

  onMouseUp(cor, e) {
    if (this.drawing === false) {
      clearRect(this.ctxDraft);
      this.endX = cor[0];
      this.endY = cor[1];
      this.ctxReal.moveTo(this.startX, this.startY);
      this.ctxReal.lineTo(cor[0], cor[1]);
      this.ctxReal.stroke();
      this.drawing = true;
    } else if (
      this.drawing === true &&
      cor[0] > this.startX - 10 &&
      cor[0] < this.startX + 10 &&
      cor[1] > this.startY - 10 &&
      cor[1] < this.startY + 10
    ) {
      clearRect(this.ctxDraft);
      this.ctxReal.lineTo(this.startX, this.startY);
      ctxReal.closePath();
      ctxReal.stroke();
      ctxReal.fill();
      this.drawing = false;
      saveImg();
    } else {
      clearRect(this.ctxDraft);
      this.ctxReal.lineTo(cor[0], cor[1]);
      this.ctxReal.stroke();
      this.endX = cor[0];
      this.endY = cor[1];
    }
  }

  onMouseEnter(cor, e) {
    $("#canvas-draft").css("cursor", "crosshair");
  }

  onMouseLeave(cor, e) {
    $("#canvas-draft").css("cursor", "default");
  }
  
  drawLine(canvas, firstPt, secondPt) {
    clearRect(this.ctxDraft);
    canvas.beginPath();
    canvas.moveTo(firstPt[0], firstPt[1]);
    canvas.lineTo(secondPt[0], secondPt[1]);
    canvas.closePath();
    canvas.stroke();
  }
}
