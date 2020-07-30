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
  data.forEach(d => {
    d.time = d.time.getTime();
  });
  data = data.filter(d => {
    if(d.time === undefined || isNaN(d.time)) return false;
    if(isNaN(d.elev)) return false;
    
    return true;
  });
  let domainX = [
    data.reduce((acc, item) => {
      return Math.min(acc, item.time);
    }, new Date(1E15)),
    data.reduce((acc, item) => {
      return Math.max(acc, item.time);
    }, new Date(-1E15))
  ];
  let x = d3.scaleTime().range([0, width]);
  x.domain(domainX);
  let x_axis = d3.axisBottom(x);
  svg.append("g")
    .attr("transform", "translate(0," + height + ")")
    .call(x_axis);

  let incline = (item1, item2) => {
    let run = d3.geoDistance([item1.lon, item1.lat], [item2.lon, item2.lat])*6.378E6;
    if(run === 0) return 0;
    let rise = item2.elev - item1.elev;
    return rise*100/run;
  };

  let compareIncline = (acc, item, index, data, calculator, min) => {
    if(index === 0) {
      item.incline = 0;
      return acc;
    }
    let item2 = item;
    if(isNaN(item2.elev)) return acc;
    let item1 = data[index-1];
    if(isNaN(item1.elev)) return acc;
    let delta = incline(item1, item2);
    item2.incline = delta;
    if(isNaN(delta)) return acc;
    let operation = min ? Math.min : Math.max;
    return operation(acc, delta);
  };

  let domainYElev = [
    data.reduce((acc, item, index, data) => {
      return compareIncline(acc, item, index, data, incline, true);
    }, 1E5),
    data.reduce((acc, item, index, data) => {
      return compareIncline(acc, item, index, data, incline, false);
    }, -1E5)
  ];
  let y = d3.scaleLinear().range([height, 0]);
  y.domain(domainYElev);
  let y_axisElev = d3.axisLeft(y);
  svg.append("g")
    .call(y_axisElev);

  let i = 0;
  let line = d3.line()
    .x(d => {
      console.log(d.time);
      x(d.time);
    })
    .y(d => y(d.incline));
  svg.append("path")
    // .data([data])
    .attr("class", "line")
    .attr("d", line(data));
};
export { Graph };
