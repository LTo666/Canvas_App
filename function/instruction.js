function rmInstruc() {
  $(".instruction").remove();
}

function addInstruc(instruction) {
  rmInstruc();
  $(".row").after(
    "<div class='instruction' style='width: 1436px; padding-top: 0.3rem; padding-bottom: 2rem; text-align: center;'></div>"
  );
  $(".instruction").html(instruction);
  $(".instruction").fadeOut(0);
  $(".instruction").fadeIn(3000);
  $(".instruction").fadeTo(2000, 0.9);
  $(".instruction").fadeOut(5000);
}

$("#circle").click(function () {
  if (tool != "circle") {
    addInstruc("Hold shift to drag a circle");
  }
});

$("#quad-curve").click(function () {
  if (tool != "quadCurve") {
    addInstruc("Drag a line, then pick a point to drag the quadratic curve");
  }
});

$("#bezier-curve").click(function () {
  if (tool != "bezierCurve") {
    addInstruc("Drag a line, then pick 2 points to drag the bezier curve");
  }
});

$("#triangle").click(function () {
  if (tool != "triangle") {
    addInstruc("Hold shift to drag a equilateral triangle");
  }
});

$("#rectangle").click(function () {
  if (tool != "rectangle") {
    addInstruc("Hold shift to drag a square");
  }
});

$("#polygon").click(function () {
  if (tool != "polygon") {
    addInstruc(
      "Drag for the sides, and finish the polygon with clicking on the starting point"
    );
  }
});

$("#text-button").click(function () {
  if (tool != "addText") {
    addInstruc("Drag for the text box, and finish it with Enter or Escape key");
  }
});

$("#pen").click(function () {
  rmInstruc();
});

$("#line").click(function () {
  rmInstruc();
});

$("#enlarger").click(function () {
  rmInstruc();
});

$("#contract").click(function () {
  rmInstruc();
});

$("#paint-bucket").click(function () {
  rmInstruc();
});

$("#magnifier").click(function () {
  rmInstruc();
});

$("#eraser").click(function () {
  rmInstruc();
});
