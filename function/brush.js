class Brush extends PaintFunction {
  constructor(ctxReal) {
    super();
    this.ctxReal = ctxReal;
    this.ctxReal.strokeStyle = $("#color").val();
    this.ctxReal.globalCompositeOperation = "source-over";
  }

  onMouseDown(cor, e) {
    if (head === "round") {
      this.ctxReal.lineCap = "round";
      this.ctxReal.lineJoin = "round";
    } else {
      this.ctxReal.lineJoin = "miter";
      this.ctxReal.lineCap = "square";
    }
    this.ctxReal.beginPath();
    this.ctxReal.moveTo(cor[0], cor[1]);
    this.draw(cor[0], cor[1]);
  }

  onDragging(cor, e) {
    this.draw([cor[0], cor[1]]);
  }

  onMouseUp() {
    saveImg();
  }

  onMouseEnter(cor, e) {
    $("#canvas-draft").css("cursor", "url(./material/brush.png), auto");
  }

  onMouseLeave(cor, e) {
    $("#canvas-draft").css("cursor", "default");
  }

  draw(cor) {
    this.ctxReal.lineTo(cor[0], cor[1]);
    this.ctxReal.moveTo(cor[0], cor[1]);
    this.ctxReal.closePath();
    this.ctxReal.stroke();
  }
}
