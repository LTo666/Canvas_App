$("#rectangle").click(() => {
  $("#input-text").css("display", "none");
  currentFunction = new DrawRectangle(ctxReal, ctxDraft);
  clearRect(ctxDraft);
  if (tool === "eraser") {
    currentFunction.ctxReal.lineWidth -= 3;
    currentFunction.ctxDraft.lineWidth = currentFunction.ctxReal.lineWidth;
  } else {
    currentFunction.ctxDraft.lineWidth = currentFunction.ctxReal.lineWidth;
  }
  $("#width-text").html(
    `Border Width: ${currentFunction.ctxReal.lineWidth - 2}`
  );
  tool = "rectangle";
  activeButton(tool);
  showDiv("wide");
  showDiv("fill-color");
  showDiv("pen-color");
});

$("#pen").click(() => {
  $("#input-text").css("display", "none");
  currentFunction = new Brush(ctxReal, ctxDraft);
  clearRect(ctxDraft);
  if (tool === "eraser") {
    currentFunction.ctxReal.lineWidth -= 3;
    tool = "brush";
  } else {
    tool = "brush";
  }
  $("#width-text").html(
    `Stroke Width: ${currentFunction.ctxReal.lineWidth - 1}`
  );
  activeButton(`pen`);
  showDiv("wide");
  hideDiv("fill-color");
  showDiv("pen-color");
});

$("#line").click(() => {
  $("#input-text").css("display", "none");
  currentFunction = new DrawLine(ctxReal, ctxDraft);
  clearRect(ctxDraft);
  if (tool === "eraser") {
    currentFunction.ctxReal.lineWidth -= 3;
    currentFunction.ctxDraft.lineWidth = currentFunction.ctxReal.lineWidth;
  } else {
    currentFunction.ctxDraft.lineWidth = currentFunction.ctxReal.lineWidth;
  }
  $("#width-text").html(
    `Stroke Width: ${currentFunction.ctxReal.lineWidth - 1}`
  );
  tool = "line";
  activeButton(tool);
  showDiv("wide");
  hideDiv("fill-color");
  showDiv("pen-color");
});

$("#quad-curve").click(() => {
  $("#input-text").css("display", "none");
  currentFunction = new DrawQuadCurve(ctxReal, ctxDraft);
  clearRect(ctxDraft);
  if (tool === "eraser") {
    currentFunction.ctxReal.lineWidth -= 3;
    currentFunction.ctxDraft.lineWidth = currentFunction.ctxReal.lineWidth;
  } else {
    currentFunction.ctxDraft.lineWidth = currentFunction.ctxReal.lineWidth;
  }
  $("#width-text").html(
    `Stroke Width: ${currentFunction.ctxReal.lineWidth - 1}`
  );
  tool = "quadCurve";
  activeButton("quad-curve");
  showDiv("wide");
  hideDiv("fill-color");
  showDiv("pen-color");
});

$("#bezier-curve").click(() => {
  $("#input-text").css("display", "none");
  currentFunction = new DrawBezierCurve(ctxReal, ctxDraft);
  clearRect(ctxDraft);
  if (tool === "eraser") {
    currentFunction.ctxReal.lineWidth -= 3;
    currentFunction.ctxDraft.lineWidth = currentFunction.ctxReal.lineWidth;
  } else {
    currentFunction.ctxDraft.lineWidth = currentFunction.ctxReal.lineWidth;
  }
  $("#width-text").html(
    `Stroke Width: ${currentFunction.ctxReal.lineWidth - 1}`
  );
  tool = "bezierCurve";
  activeButton("bezier-curve");
  showDiv("wide");
  hideDiv("fill-color");
  showDiv("pen-color");
});

$("#circle").click(() => {
  $("#input-text").css("display", "none");
  currentFunction = new DrawCircle(ctxReal, ctxDraft);
  clearRect(ctxDraft);
  if (tool === "eraser") {
    currentFunction.ctxReal.lineWidth -= 3;
    currentFunction.ctxDraft.lineWidth = currentFunction.ctxReal.lineWidth;
  } else {
    currentFunction.ctxDraft.lineWidth = currentFunction.ctxReal.lineWidth;
  }
  $("#width-text").html(
    `Border Width: ${currentFunction.ctxReal.lineWidth - 2}`
  );
  tool = "circle";
  activeButton(tool);
  showDiv("wide");
  showDiv("fill-color");
  showDiv("pen-color");
});

$("#triangle").click(() => {
  $("#input-text").css("display", "none");
  currentFunction = new DrawTriangle(ctxReal, ctxDraft);
  clearRect(ctxDraft);
  if (tool === "eraser") {
    currentFunction.ctxReal.lineWidth -= 3;
    currentFunction.ctxDraft.lineWidth = currentFunction.ctxReal.lineWidth;
  } else {
    currentFunction.ctxDraft.lineWidth = currentFunction.ctxReal.lineWidth;
  }
  $("#width-text").html(
    `Border Width: ${currentFunction.ctxReal.lineWidth - 2}`
  );
  tool = "triangle";
  activeButton(tool);
  showDiv("wide");
  showDiv("fill-color");
  showDiv("pen-color");
});

$("#polygon").click(() => {
  $("#input-text").css("display", "none");
  currentFunction = new DrawPolygon(ctxReal, ctxDraft);
  clearRect(ctxDraft);
  if (tool === "eraser") {
    currentFunction.ctxReal.lineWidth -= 3;
    currentFunction.ctxDraft.lineWidth = currentFunction.ctxReal.lineWidth;
  } else {
    currentFunction.ctxDraft.lineWidth = currentFunction.ctxReal.lineWidth;
  }
  $("#width-text").html(
    `Border Width: ${currentFunction.ctxReal.lineWidth - 2}`
  );
  tool = "polygon";
  activeButton(tool);
  showDiv("wide");
  showDiv("fill-color");
  showDiv("pen-color");
});

$("#clear").click(() => {
  $("#input-text").css("display", "none");
  clearRect(ctxDraft);
  if (imgIndex < 0) {
    return;
  } else {
    if (confirm("The Image Data will be clear without saving!")) {
      undoImg = [];
      redoImg = [];
      imgIndex = -1;
      clearRect(ctxReal);
      disableButton("undo");
      disableButton("redo");
      disableButton("clear");
    } else {
      return;
    }
  }
});

$("#undo").click(() => {
  $("#input-text").css("display", "none");
  clearRect(ctxDraft);
  if (imgIndex == 0) {
    redoImg.unshift(undoImg[imgIndex]);
    clearRect(ctxReal);
    undoImg = [];
    imgIndex = -1;
    ableButton("redo");
    disableButton("undo");
    redoState = true;
    disableButton("clear");
  } else if (imgIndex > 0) {
    redoImg.unshift(undoImg[imgIndex]);
    undoImg.pop();
    imgIndex--;
    ctxReal.putImageData(undoImg[imgIndex], 0, 0);
    ableButton("redo");
    redoState = true;
  } else {
    clearRect(ctxDraft);
  }
});

$("#redo").click(() => {
  $("#input-text").css("display", "none");
  clearRect(ctxDraft);
  if (redoState && redoImg.length != 0) {
    ctxReal.putImageData(redoImg[0], 0, 0);
    undoImg.push(redoImg[0]);
    imgIndex++;
    redoImg.shift();
    if (redoImg.length == 0) {
      disableButton("redo");
      redoState = false;
    }
    ableButton("undo");
    ableButton("clear");
  } else {
    return;
  }
});

$("#btn-download").click(() => {
  $("#input-text").css("display", "none");
  clearRect(ctxDraft);
  $("#btn-download").attr("download", "image.png");
  $("#btn-download").attr("href", canvasReal.toDataURL());
});

$("#enlarger").click(() => {
  $("#input-text").css("display", "none");
  $("#canvas-zoom").css("display", "none");
  clearRect(ctxDraft);
  tool = "enlarger";
  activeButton(tool);
  if (scaleCounter == -1) {
    enlarge();
    b4ContractImg = [];
    b4EnlargeImg = [];
    scaleCounter = 0;
    clearRect(ctxDraft);
  }
  if (scaleCounter >= -3 && scaleCounter < 3) {
    enlarge();
    clearRect(ctxDraft);
  } else if (scaleCounter == 3) {
    clearRect(ctxDraft);
  }
});

$("#contract").click(() => {
  $("#input-text").css("display", "none");
  clearRect(ctxDraft);
  tool = "contract";
  activeButton(tool);
  if (scaleCounter == 1) {
    contract();
    b4ContractImg.shift();
    b4ContractImg = [];
    b4EnlargeImg = [];
    scaleCounter = 0;
    clearRect(ctxDraft);
  } else if (scaleCounter > -3 && scaleCounter <= 3) {
    contract();
    b4ContractImg.shift();
    console.log(scaleCounter);
    clearRect(ctxDraft);
  } else if (scaleCounter == -3) {
    clearRect(ctxDraft);
  }
});

$("#paint-bucket").click(() => {
  $("#input-text").css("display", "none");
  clearRect(ctxDraft);
  currentFunction = new PaintBucket(canvasReal, ctxReal, canvasZoom, ctxZoom);
  hideDiv("wide");
  showDiv("fill-color");
  hideDiv("pen-color");

  activeButton("paint-bucket");
});

$("#magnifier").click(() => {
  $("#input-text").css("display", "none");
  clearRect(ctxDraft);
  currentFunction = new Magnifier(canvasReal, ctxReal, ctxZoom, canvasZoom);
  hideDiv("wide");
  hideDiv("fill-color");
  hideDiv("pen-color");
  activeButton("magnifier");
});

$("#color").on("input", () => {
  clearRect(ctxDraft);
  ctxReal.strokeStyle = $("#color").val();
  root.style.setProperty("--clr-strokeColor", ctxReal.strokeStyle);
});

$("#fill-color").on("input", function () {
  clearRect(ctxDraft);
  ctxReal.fillStyle = $("#fill-color").val();
  root.style.setProperty("--clr-fillColor", ctxReal.fillStyle);
});

$("#pen-range").on("input", function () {
  clearRect(ctxDraft);
  if (
    tool === "brush" ||
    tool === "bezierCurve" ||
    tool === "quadCurve" ||
    tool === "line"
  ) {
    currentFunction.ctxReal.lineWidth = parseInt($("#pen-range").val());
    $("#width-text").html(
      `Stroke Width: ${currentFunction.ctxReal.lineWidth - 1}`
    );
    currentFunction.ctxDraft.lineWidth = currentFunction.ctxReal.lineWidth;
  } else if (
    tool === "rectangle" ||
    tool === "triangle" ||
    tool === "circle" ||
    tool === "polygon"
  ) {
    currentFunction.ctxReal.lineWidth = parseInt($("#pen-range").val());
    currentFunction.ctxDraft.lineWidth = currentFunction.ctxReal.lineWidth;
    $("#width-text").html(
      `Border Width: ${currentFunction.ctxReal.lineWidth - 2}`
    );
  } else if (tool === "addText") {
    currentFunction.fontSize = parseInt($("#pen-range").val());
    $("#width-text").html(`Font Size: ${currentFunction.fontSize - 1}`);
    $("#input-text").css("font-size", `${currentFunction.fontSize + 22}px`);
  } else {
    currentFunction.ctxReal.lineWidth = parseInt($("#pen-range").val()) + 3;
    $("#width-text").html(
      `Rubber Width: ${currentFunction.ctxReal.lineWidth - 4}`
    );
  }
});

$("#eraser").click(() => {
  $("#input-text").css("display", "none");
  clearRect(ctxDraft);
  currentFunction = new Eraser(ctxReal, ctxDraft);
  if (tool != "eraser") {
    currentFunction.ctxReal.lineWidth += 3;
    tool = "eraser";
  } else {
    tool = "eraser";
  }
  $("#width-text").html(
    `Rubber Width: ${currentFunction.ctxReal.lineWidth - 4}`
  );
  activeButton("eraser");
  showDiv("wide");
  hideDiv("fill-color");
  hideDiv("pen-color");
});

$("#rdHead").click(() => {
  clearRect(ctxDraft);
  head = "round";
  $(".switch").addClass("unswitch");
  $(".switch").removeClass("switch");
  $("#rdHead").addClass("switch");
});

$("#sqHead").click(() => {
  clearRect(ctxDraft);
  head = "square";
  $(".switch").addClass("unswitch");
  $(".switch").removeClass("switch");
  $("#sqHead").addClass("switch");
});

$("#text-button").click(() => {
  $("#input-text").css("display", "none");
  clearRect(ctxDraft);
  currentFunction = new AddText(ctxReal, ctxDraft);
  $("#width-text").html(`Font Size: ${currentFunction.fontSize - 1}`);
  tool = "addText";
  activeButton("text-button");
  showDiv("wide");
  showDiv("pen-color");
  hideDiv("fill-color");
  $("#input-text").keyup((e) => {
    if (e.which == 13 || e.which == 27) {
      currentFunction.ctxReal.fillStyle = $("#color").val();
      let text = $("#input-text").val();
      currentFunction.ctxReal.font = `${
        currentFunction.fontSize + 18
      }px Trebuchet MS`;
      currentFunction.ctxReal.fillText(
        text,
        currentFunction.ptX,
        currentFunction.ptY +
          currentFunction.fontSize +
          18 +
          Math.abs(currentFunction.corY - currentFunction.endY) / 2 -
          (currentFunction.fontSize + 18) / 2
      );
      saveImg();
      $("#input-text").val("");
      $("#input-text").css("display", "none");
    }
  });
});

head = "round";
$("#width-text").html(`Stroke Width: ${ctxReal.lineWidth - 1}`);
hideDiv("wide");
hideDiv("fill-color");
hideDiv("pen-color");
