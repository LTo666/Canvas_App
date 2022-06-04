class Magnifier extends PaintFunction {
  constructor(canvasReal, ctxReal, ctxZoom, canvasZoom) {
    super();
    this.canvasReal = canvasReal;
    this.ctxZoom = ctxZoom;
    this.ctxReal = ctxReal;
    this.canvasZoom = canvasZoom;
  }

  onMouseMove(cor, e) {
    this.canvasZoom.style.top = e.pageY - 180 + "px";
    this.canvasZoom.style.left = e.pageX - 150 + "px";
    $("#canvas-zoom").attr("width", "300")
    $("#canvas-zoom").attr("height", "150")
    this.ctxZoom.fillStyle = "#202443";
    $("#canvas-zoom").css("border-radius", "0");
    this.ctxZoom.clearRect(0, 0, this.canvasZoom.width, this.canvasZoom.height);
    this.ctxZoom.fillRect(0, 0, this.canvasZoom.width, this.canvasZoom.height);
    this.ctxZoom.drawImage(
      this.canvasReal,
      parseInt(cor[0]) - 20,
      parseInt(cor[1]) - 20,
      300,
      150,
      0,
      0,
      900,
      450
    );
  }

  onMouseEnter(cor, e) {
    $("#canvas-draft").css("cursor", "url(./material/loupe.png), auto");
    $("#canvas-zoom").css("display", "block");
  }

  onMouseLeave(cor, e) {
    $("#canvas-draft").css("cursor", "default");
    $("#canvas-zoom").css("display", "none");
  }
}
