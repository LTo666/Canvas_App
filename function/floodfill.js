class PaintBucket extends PaintFunction {
  constructor(canvasReal, ctxReal, canvasZoom, ctxZoom) {
    super();
    this.canvasReal = canvasReal;
    this.ctxReal = ctxReal;
    this.canvasZoom = canvasZoom;
    this.ctxZoom = ctxZoom;
    this.ctxReal.fillStyle = $("#fill-color").val();
    this.imageData = this.ctxReal.getImageData(
      0,
      0,
      this.canvasReal.width,
      this.canvasReal.height
    );
    this.col = {};
    this.ctxReal.globalCompositeOperation = "source-over";
  }

  onMouseDown(cor, e) {
    this.col = {
      r: `0x${this.colorR(this.ctxReal.fillStyle)}`,
      g: `0x${this.colorG(this.ctxReal.fillStyle)}`,
      b: `0x${this.colorB(this.ctxReal.fillStyle)}`,
      a: `0xff`,
    };
  }

  onMouseMove(cor, e) {
    this.canvasZoom.style.top = e.pageY - 130 + "px";
    this.canvasZoom.style.left = e.pageX - 50 + "px";
    $("#canvas-zoom").attr("width", "100")
    $("#canvas-zoom").attr("height", "100")
    this.ctxZoom.fillStyle = "#202443";
    $("#canvas-zoom").css("border-radius", "5rem");
    this.ctxZoom.clearRect(0, 0, this.canvasZoom.width, this.canvasZoom.height);
    this.ctxZoom.fillRect(0, 0, this.canvasZoom.width, this.canvasZoom.height);
    this.ctxZoom.drawImage(
      this.canvasReal,
      parseInt(cor[0]) - 5,
      parseInt(cor[1]) - 6,
      100,
      100,
      0,
      0,
      300,
      300
    );
    this.ctxZoom.beginPath();
    this.ctxZoom.moveTo(
      this.canvasZoom.width / 2 - 3,
      this.canvasZoom.height / 2 - 3
    );
    this.ctxZoom.lineTo(
      this.canvasZoom.width / 2 + 3,
      this.canvasZoom.height / 2 - 3
    );
    this.ctxZoom.lineTo(
      this.canvasZoom.width / 2 + 3,
      this.canvasZoom.height / 2 + 3
    );
    this.ctxZoom.lineTo(
      this.canvasZoom.width / 2 - 3,
      this.canvasZoom.height / 2 + 3
    );
    this.ctxZoom.closePath();
    this.ctxZoom.stroke();
  }

  onMouseEnter(cor, e) {
    $("#canvas-draft").css("cursor", "url(./material/paint-bucket.png), auto");
    $("#canvas-zoom").css("display", "block");
  }

  onMouseLeave(cor, e) {
    $("#canvas-draft").css("cursor", "default");
    $("#canvas-zoom").css("display", "none");
  }

  onDragging(cor, e) {}

  onMouseUp(cor, e) {
    const rect = this.canvasReal.getBoundingClientRect();
    const x = Math.round(e.clientX - rect.left);
    const y = Math.round(e.clientY - rect.top);
    this.floodFill(this.imageData, this.col, x, y);
    this.ctxReal.putImageData(this.imageData, 0, 0);
    saveImg();
  }

  colorR(color) {
    return color.slice(1, 3);
  }

  colorG(color) {
    return color.slice(3, 5);
  }

  colorB(color) {
    return color.slice(5);
  }

  // Function to get color data in canvas in clicked coordinates
  getColorAtPixel(imageData, x, y) {
    const { width, data } = imageData;

    return {
      r: data[4 * (width * y + x) + 0],
      g: data[4 * (width * y + x) + 1],
      b: data[4 * (width * y + x) + 2],
      a: data[4 * (width * y + x) + 3],
    };
  }

  // Function to change color in canvas
  setColorAtPixel(imageData, color, x, y) {
    const { width, data } = imageData;

    data[4 * (width * y + x) + 0] = color.r & 0xff;
    data[4 * (width * y + x) + 1] = color.g & 0xff;
    data[4 * (width * y + x) + 2] = color.b & 0xff;
    data[4 * (width * y + x) + 3] = color.a & 0xff;
  }

  // Function to compare the color
  colorMatch(a, b) {
    return a.r == b.r && a.g == b.g && a.b == b.b && a.a == b.a;
  }

  // Function to flood fill
  floodFill(imageData, newColor, x, y) {
    const { width, height, data } = imageData;
    const stack = [];
    const baseColor = this.getColorAtPixel(imageData, x, y);
    let operator = { x, y };

    // Check if base color and new color are the same
    if (this.colorMatch(baseColor, newColor)) {
      return;
    } else {
      // Add the clicked location to stack
      stack.push({ x: operator.x, y: operator.y });

      while (stack.length) {
        operator = stack.pop();
        let contiguousDown = true; // Vertical is assumed to be true
        let contiguousUp = true; // Vertical is assumed to be true
        let contiguousLeft = false;
        let contiguousRight = false;

        // Move to top most contiguousDown pixel
        while (contiguousUp && operator.y >= 0) {
          operator.y--;
          contiguousUp = this.colorMatch(
            this.getColorAtPixel(imageData, operator.x, operator.y),
            baseColor
          );
        }

        // Move downward
        while (contiguousDown && operator.y < height) {
          this.setColorAtPixel(imageData, newColor, operator.x, operator.y);

          // Check left
          if (
            operator.x - 1 >= 0 &&
            this.colorMatch(
              this.getColorAtPixel(imageData, operator.x - 1, operator.y),
              baseColor
            )
          ) {
            if (!contiguousLeft) {
              contiguousLeft = true;
              stack.push({ x: operator.x - 1, y: operator.y });
            }
          } else {
            contiguousLeft = false;
          }

          // Check right
          if (
            operator.x + 1 < width &&
            this.colorMatch(
              this.getColorAtPixel(imageData, operator.x + 1, operator.y),
              baseColor
            )
          ) {
            if (!contiguousRight) {
              stack.push({ x: operator.x + 1, y: operator.y });
              contiguousRight = true;
            }
          } else {
            contiguousRight = false;
          }

          operator.y++;
          contiguousDown = this.colorMatch(
            this.getColorAtPixel(imageData, operator.x, operator.y),
            baseColor
          );
        }
      }
    }
  }
}
