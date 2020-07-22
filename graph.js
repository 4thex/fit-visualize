let Graph = data => {
  let svg = d3
    .select("#graph")
    .append("svg")
    .attr("width", 500)
    .attr("height", 500);
  let domainX = [
    data.reduce((acc, item) => {
      return Math.min(acc, item.time);
    }, new Date(1E15)),
    data.reduce((acc, item) => {
      return Math.max(acc, item.time);
    }, new Date(-1E15))
  ];
  let scaleX = d3.scaleTime()
    .domain(domainX)
    .range([0, 500]);
  let x_axis = d3.axisBottom()
    .scale(scaleX);
  svg.append("g")
    .call(x_axis);

  let domainY = [
    data.reduce((acc, item) => {
      return Math.min(acc, item.elev);
    }, 1E5),
    data.reduce((acc, item) => {
      return Math.max(acc, item.elev);
    }, -1E5)
  ];
  let scaleY = d3.scaleLinear()
    .domain(domainY)
    .range([0, 500]);
  let y_axis = d3.axisLeft()
    .scale(scaleY);
  svg.append("g")
    .call(y_axis);

};
export { Graph };
