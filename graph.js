let Graph = data => {
  // Clear
  d3.select("#graph").selectAll("*").remove();
  // Define margin
  let margin = {top: 20, right: 20, bottom: 30, left: 50};
  let height = 500 - margin.top - margin.bottom;
  let width = 500 - margin.left - margin.right;
  let svg = d3
    .select("#graph")
    .append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .append("g")
    .attr("transform",
          "translate(" + margin.left + "," + margin.top + ")");
  let domainX = [
    data.reduce((acc, item) => {
      return Math.min(acc, item.time);
    }, new Date(1E15)),
    data.reduce((acc, item) => {
      return Math.max(acc, item.time);
    }, new Date(-1E15))
  ];
  let x = d3.scaleTime().range([0, width]);
  let scaleX = x.domain(domainX);
  let x_axis = d3.axisBottom().scale(scaleX);
  svg.append("g")
    .attr("transform", "translate(0," + height + ")")
    .call(x_axis);

  let domainY = [
    data.reduce((acc, item) => {
      return Math.min(acc, item.elev);
    }, 1E5),
    data.reduce((acc, item) => {
      return Math.max(acc, item.elev);
    }, -1E5)
  ];
  let y = d3.scaleLinear().range([height, 0]);
  let scaleY = y.domain(domainY);
  let y_axis = d3.axisLeft().scale(scaleY);
  svg.append("g")
    .call(y_axis);

  let line = d3.line()
    .x(d => { return x(d.time); })
    .y(d => { return y(d.elev); });
  svg.append("path")
        .data(data)
        .attr("class", "line")
        .attr("d", line);
};
export { Graph };
