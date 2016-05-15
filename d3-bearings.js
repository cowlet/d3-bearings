(function () {
  var data = [1, 3, 6, 18, 23];
  var width = 720;
  var height = 128;

  var vis = d3.select(".bearings")
    .attr("width", width)
    .attr("height", height);

  var circle = vis.selectAll("circle")
    .data(data)
    .enter().append("circle")
      .attr("cx", function(d, i) { return 40 * (i + 1); })
      .attr("cy", 60)
      .attr("r", function(d) { return d; });
})();
