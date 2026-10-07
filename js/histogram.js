const margin = { top: 40, right: 30, bottom: 50, left: 70 };
const width = 800;
const height = 400;
const innerWidth = width - margin.left - margin.right;
const innerHeight = height - margin.top - margin.bottom;

function drawHistogram(data) {
  const container = d3.select("#histogram");

  container.selectAll("svg").remove();

  const svg = container.append("svg")
    .attr("class", "chart")
    .attr("viewBox", `0 0 ${width} ${height}`)
    .attr("role", "img")
    .attr("aria-label", "Histogram of TV energy consumption");

  const chart = svg.append("g")
    .attr("transform", `translate(${margin.left},${margin.top})`);

  const x = d3.scaleLinear()
    .domain([0, MAX_ENERGY])
    .range([0, innerWidth]);

  const bins = energyBinGenerator(data);

  const y = d3.scaleLinear()
    .domain([0, d3.max(bins, d => d.length) || 1])
    .nice()
    .range([innerHeight, 0]);

  chart.selectAll(".bar")
    .data(bins)
    .join("rect")
    .attr("class", "bar")
    .attr("x", d => x(d.x0) + 1)
    .attr("y", d => y(d.length))
    .attr("width", d => Math.max(0, x(d.x1) - x(d.x0) - 2))
    .attr("height", d => innerHeight - y(d.length));

  chart.selectAll(".bar-label")
    .data(bins)
    .join("text")
    .attr("class", "bar-label")
    .attr("x", d => (x(d.x0) + x(d.x1)) / 2)
    .attr("y", d => y(d.length) - 8)
    .attr("text-anchor", "middle")
    .text(d => d.length > 0 ? d.length : "");

  chart.append("g")
    .attr("class", "axis")
    .attr("transform", `translate(0,${innerHeight})`)
    .call(d3.axisBottom(x).ticks(9));

  chart.append("g")
    .attr("class", "axis")
    .call(d3.axisLeft(y).ticks(7));

  chart.append("text")
    .attr("class", "axis-label")
    .attr("x", innerWidth)
    .attr("y", innerHeight + 48)
    .attr("text-anchor", "end")
    .text("Labeled Energy Consumption (kWh/year)");

  chart.append("text")
    .attr("class", "axis-label")
    .attr("transform", "rotate(-90)")
    .attr("x", -8)
    .attr("y", -42)
    .attr("text-anchor", "end")
    .text("Frequency");
}
