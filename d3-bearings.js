(function () {
  var circle = d3.selectAll("circle");

  var min = 5;
  var max = 15;
  var delta = 0.1;

  function step() {
    var r = +circle.attr("r");

    r = r + delta;

    if (r > max) {
      r = max;
      delta = delta * -1;
    } else if (r < min) {
      r = min;
      delta = delta * -1;
    }

    circle.attr("r", r);
    requestAnimationFrame(step);
  }

  requestAnimationFrame(step);
})();
