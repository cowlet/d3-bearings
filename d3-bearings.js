(function () {
  d3.json("data/data.json", function(error, json) {
    if (error) {
      return console.warn(error);
    }
    visualise(json);
  });

  function visualise(data) {
    var margin = {top: 20, right: 30, bottom: 30, left: 40};
    var width = 780 - margin.left - margin.right;
    var height = 480 - margin.top - margin.bottom;
    var radius = 4;
    var totalWidth = width + margin.left + margin.right;
    var totalHeight = height + margin.top + margin.bottom;

    var svg = d3.select(".bearings")
        .attr("viewBox", "0 0 " + totalWidth + " " + totalHeight);
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

    var defaultColour = "rgba(255, 0, 0, 0.2)";
    var colours = {
      "early": "rgba(0, 255, 0, 0.2)",
      "normal": "rgba(0, 0, 255, 0.2)",
      "suspect": "rgba(218, 165, 32, 0.2)",
      "stage2": "rgba(250, 128, 114, 0.2)"
    };

    function render(xs) {
      var circle = vis.selectAll("circle")
        .data(xs, function(d) { return d.id; });

      circle.enter().append("circle")
          .attr("cx", function(d) { return xscale(d.bpfi); })
          .attr("cy", function(d) { return yscale(d.bpfo); })
          .attr("r", radius)
          .style("fill", function(d) { return colours[d.state] || defaultColour; })
          .append("svg:title")
            .text(function(d) { return d.state });
      circle.exit().remove();
    };

    render(data);

    var inputs = document.querySelectorAll(".controls input");

    function checkboxHandler() {
      var i;
      var checked = [];

      for (i = 0; i < inputs.length; i++) {
        if (inputs[i].checked) {
          checked = checked.concat(inputs[i].name.split(" "));
          checked.push(inputs[i].name);
        }
      }

      var filtered = data.filter(function(d) {
        return checked.includes(d.state);
      });

      render(filtered);
    };

    (function() {
      var i;

      for (i = 0; i < inputs.length; i++) {
        inputs[i].onchange = checkboxHandler;
      }
    })();

    checkboxHandler();
  };
})();
