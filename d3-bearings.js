(function () {
  d3.json("data/data.json", function(error, json) {
    if (error) {
      return console.warn(error);
    }
    visualise(json);
  });


  function visualise(data) {
    var width = 720;
    var height = 720;

    var vis = d3.select(".bearings")
      .attr("width", width)
      .attr("height", height);

    var bpfi = data.map(function(d) { return d.bpfi; });
    var bpfo = data.map(function(d) { return d.bpfo; });

    var xscale = d3.scaleLinear()
      .domain([d3.min(bpfi), d3.max(bpfi)])
      .range([0, width])
      .nice();

    var yscale = d3.scaleLinear()
      .domain([d3.min(bpfo), d3.max(bpfo)])
      .range([height, 0])
      .nice();

    var circle = vis.selectAll("circle")
      .data(data)
      .enter().append("circle")
        .attr("cx", function(d) { return xscale(d.bpfi); })
        .attr("cy", function(d) { return yscale(d.bpfo); })
        .attr("r", 5);
  };
})();
