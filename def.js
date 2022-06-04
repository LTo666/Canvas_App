const canvasReal = document.getElementById("canvas-real");
const ctxReal = canvasReal.getContext("2d");
const canvasDraft = document.getElementById("canvas-draft");
const ctxDraft = canvasDraft.getContext("2d");
const canvasZoom = document.getElementById("canvas-zoom");
const ctxZoom = canvasZoom.getContext("2d");
const root = document.documentElement;
ctxReal.fillStyle = $("#fill-color").val();
ctxDraft.fillStyle = "#8d8d8d";
ctxReal.strokeStyle = $("#color").val();
ctxDraft.strokeStyle = "#8d8d8d";
ctxReal.lineWidth = parseInt($("#pen-range").val());
ctxDraft.lineWidth = ctxReal.lineWidth;
ctxZoom.strokeStyle = "#8d8d8d";
ctxZoom.lineWidth = 2;
ctxZoom.fillStyle = "#202443";

let currentFunction;
let tool;
let head;
let dragging = false;
let undoImg = [];
let redoImg = [];
let redoState = false;
let imgIndex = -1;
let b4ContractImg = [];
let b4EnlargeImg = [];
let scaleCounter = 0;

function clearRect(ctx) {
  ctx.clearRect(0, 0, canvasDraft.width, canvasDraft.height);
}

function activeButton(id) {
  $('.active').removeClass('active')
  $(`#${id}`).addClass('active')
}

function ableButton (id) {
  $(`#${id}`).addClass("able")
  $(`#${id}`).removeClass("disabled")
}

function disableButton (id) {
  $(`#${id}`).addClass("disabled")
  $(`#${id}`).removeClass("able")
}

function hideDiv(className) {
  $(`.${className}`).css("display", "none")
}

function showDiv(className) {
  if (className == "pen-color" && tool != "addText") {
    $("#pen-color-text").html("Stroke")
  } else if (className == "pen-color" && tool == "addText") {
    $("#pen-color-text").html("Fill")
  }
  $(`.${className}`).css("display", "block")
}

function saveImg() {
  undoImg.push(ctxReal.getImageData(0, 0, canvasReal.width, canvasReal.height));
  imgIndex++;
  redoImg = []
  redoState = false;
  ableButton("undo")
  disableButton("redo")
  ableButton("clear")
}

function saveScaleImg(imgData, ctx) {
  imgData.unshift(ctx.getImageData(0, 0, canvasReal.width, canvasReal.height));
}

function enlarge() {
  saveScaleImg(b4EnlargeImg, ctxReal);
  let scale = 0.1;
  ctxDraft.putImageData(b4EnlargeImg[0], 0, 0);
  ctxReal.clearRect(0, 0, canvasReal.width, canvasReal.height);
  let sx = canvasReal.width * scale;
  let sy = canvasReal.height * scale;
  let swidth = canvasReal.width - sx * 2;
  let sheight = canvasReal.height - sy * 2;
  ctxReal.drawImage(
    canvasDraft,
    sx,
    sy,
    swidth,
    sheight,
    0,
    0,
    canvasReal.width,
    canvasReal.height
  );
  scaleCounter++;
}

function contract() {
  saveScaleImg(b4ContractImg, ctxReal);
  let scale = 0.1;
  ctxDraft.putImageData(b4ContractImg[0], 0, 0);
  ctxReal.clearRect(0, 0, canvasReal.width, canvasReal.height);
  let sx = canvasReal.width * scale;
  let sy = canvasReal.height * scale;
  let swidth = canvasReal.width - sx * 2;
  let sheight = canvasReal.height - sy * 2;
  if (b4EnlargeImg.length != 0) {
    ctxReal.putImageData(b4EnlargeImg[0], 0, 0);
    b4EnlargeImg.shift();
  }
  ctxReal.drawImage(
    canvasDraft,
    0,
    0,
    canvasReal.width,
    canvasReal.height,
    sx,
    sy,
    swidth,
    sheight
  );
  scaleCounter--;
}

class PaintFunction {
  constructor() {}
  onMouseDown() {}
  onDragging() {}
  onMouseMove() {}
  onMouseUp() {}
  onMouseLeave() {}
  onMouseEnter() {}
}

$("#canvas-draft").mousedown(function (e) {
  let mouseX = e.offsetX;
  let mouseY = e.offsetY;
  currentFunction.onMouseDown([mouseX, mouseY], e);
  dragging = true;
});

$("#canvas-draft").mousemove(function (e) {
  let mouseX = e.offsetX;
  let mouseY = e.offsetY;
  if (dragging) {
    currentFunction.onDragging([mouseX, mouseY], e);
  }
  currentFunction.onMouseMove([mouseX, mouseY], e);
});

$("#canvas-draft").mouseup(function (e) {
  dragging = false;
  let mouseX = e.offsetX;
  let mouseY = e.offsetY;
  currentFunction.onMouseUp([mouseX, mouseY], e);
});

$("#canvas-draft").mouseleave(function (e) {
  dragging = false;
  let mouseX = e.offsetX;
  let mouseY = e.offsetY;
  currentFunction.onMouseLeave([mouseX, mouseY], e);
});

$("#canvas-draft").mouseenter(function (e) {
  let mouseX = e.offsetX;
  let mouseY = e.offsetY;
  currentFunction.onMouseEnter([mouseX, mouseY], e);
});
