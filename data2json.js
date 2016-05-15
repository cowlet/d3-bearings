var os = require("os"),
    rw = require("rw").dash,
    dsv = require("d3-dsv");

function transform(d) {
  return {
    state: d.State,
    skew: +d["Skew.x"],
    kurt: +d["Kurt.x"],
    bpfi: +d["BPFI.x"],
    bpfo: +d["BPFO.x"]
  };
}

rw.readFile(process.argv[2] || "-", "utf8", function(error, text) {
  if (error) throw error;
  rw.writeFile("-", JSON.stringify(dsv.csvParse(text, transform)) + os.EOL, "utf8", function(error) {
    if (error) throw error;
  });
});
