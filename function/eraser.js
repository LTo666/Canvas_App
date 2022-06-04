class Eraser extends PaintFunction {
  constructor(ctxReal) {
    super();
    this.ctxReal = ctxReal;
    this.ctxReal.globalCompositeOperation = "destination-out";
  }

  onMouseDown(cor, e) {
    if (head === "round") {
      currentFunction.ctxReal.lineCap = "round";
      currentFunction.ctxReal.lineJoin = "round";
    } else {
      currentFunction.ctxReal.lineJoin = "miter";
      currentFunction.ctxReal.lineCap = "square";
    }
    this.corX = cor[0];
    this.corY = cor[1];
    this.draw([cor[0], cor[1]]);
  }

  onDragging(cor, e) {
    this.draw([cor[0], cor[1]]);
  }

  onMouseUp() {
    saveImg();
  }

  onMouseEnter(cor, e) {
    $("#canvas-draft").css("cursor", "url(./material/rubber.png), auto");
  }

  onMouseLeave(cor, e) {
    $("#canvas-draft").css("cursor", "default");
  }

  draw(cor) {
    this.ctxReal.beginPath();
    this.ctxReal.arc(cor[0], cor[1], 2, 0, 2 * Math.PI);
    this.ctxReal.fill();
    this.ctxReal.lineWidth = parseInt($("#pen-range").val()) + 3;
    this.ctxReal.beginPath();
    this.ctxReal.moveTo(this.corX, this.corY);
    this.ctxReal.lineTo(cor[0], cor[1]);
    this.ctxReal.stroke();
    this.corX = cor[0];
    this.corY = cor[1];
  }
}
