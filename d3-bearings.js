(function () {
  d3.json("data/data.json", function(error, json) {
    if (error) {
      return console.warn(error);
    }
    visualise(json);
  });


  function visualise(data) {
    var margin = {top: 20, right: 30, bottom: 30, left: 40};
    var width = 580 - margin.left - margin.right;
    var height = 580 - margin.top - margin.bottom;
    var radius = 4;

    var svg = d3.select(".bearings")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom);
    var vis = svg.append("g")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    var bpfi = data.map(function(d) { return d.bpfi; });
    var bpfo = data.map(function(d) { return d.bpfo; });

    var xscale = d3.scaleLinear()
      .domain([d3.min(bpfi), d3.max(bpfi)])
      .range([0 + radius, width + 2 * radius])
      .nice();

    var yscale = d3.scaleLinear()
      .domain([d3.min(bpfo), d3.max(bpfo)])
      .range([height - 2 * radius, 0 - radius])
      .nice();

    var xaxis = d3.axisBottom(xscale);
    svg.append("g")
      .attr("class", "axis")
      .attr("transform", "translate(" + margin.left + "," + (height + margin.top) + ")")
      .call(xaxis);

    var yaxis = d3.axisLeft(yscale);
    svg.append("g")
      .attr("class", "axis")
      .attr("transform", "translate(" + margin.left + ", " + margin.top + ")")
      .call(yaxis);

    var circle = vis.selectAll("circle")
      .data(data)
      .enter().append("circle")
        .attr("cx", function(d) { return xscale(d.bpfi); })
        .attr("cy", function(d) { return yscale(d.bpfo); })
        .attr("r", radius)
        .style("fill", function(d) {
          if (d.state === "early") {
            return "rgba(0, 255, 0, 0.2)";
          } else if (d.state === "normal") {
            return "rgba(0, 0, 255, 0.2)";
          } else if (d.state === "suspect") {
            return "rgba(218, 165, 32, 0.2)";
          } else if (d.state === "stage2") {
            return "rgba(250, 128, 114, 0.2)";
          } else {
            return "rgba(255, 0, 0, 0.2)";
          }
        })
  };
})();
