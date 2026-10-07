function drawScatterplot(data) {
  const container = innerChartS;

  container.selectAll("svg").remove();
  d3.select("body").selectAll(".scatter-tooltip").remove();

  const svg = container.append("svg")
    .attr("class", "chart")
    .attr("viewBox", `0 0 ${widthS} ${heightS}`)
    .attr("role", "img")
    .attr("aria-label", "Scatterplot of TV star rating and energy consumption");

  const chart = svg.append("g")
    .attr("transform", `translate(${marginS.left},${marginS.top})`);

  const legend = svg.append("g")
    .attr("class", "scatter-legend")
    .attr("transform", `translate(${marginS.left},12)`);

  SCREEN_TYPES.slice(1).forEach((screenType, index) => {
    const item = legend.append("g")
      .attr("transform", `translate(${index * 92},0)`);

    item.append("rect")
      .attr("width", 14)
      .attr("height", 14)
      .attr("fill", colorScale(screenType));

    item.append("text")
      .attr("x", 20)
      .attr("y", 12)
      .text(screenType);
  });

  xScaleS.domain([0, d3.max(data, d => d.star) || 1]).nice();
  yScaleS.domain([0, MAX_ENERGY]).nice();

  const tooltip = d3.select("body")
    .append("div")
    .attr("class", "scatter-tooltip")
    .style("width", `${tooltipWidth}px`)
    .style("min-height", `${tooltipHeight}px`)
    .style("opacity", 0);

  chart.selectAll(".point")
    .data(data)
    .join("circle")
    .attr("class", "point")
    .attr("cx", d => xScaleS(d.star))
    .attr("cy", d => yScaleS(d.energyConsumption))
    .attr("r", 4)
    .attr("fill", d => colorScale(d.screenTech))
    .on("mouseenter", function(event, d) {
      d3.select(this).attr("r", 6);
      tooltip
        .style("opacity", 1)
        .html(`<strong>${d.brand} ${d.model}</strong><br>
          Screen: ${d.screenSize}&quot; ${d.screenTech}<br>
          Energy: ${d.energyConsumption} kWh/year<br>
          Rating: ${d.star} stars`)
        .style("left", `${event.pageX + 12}px`)
        .style("top", `${event.pageY - 28}px`);
    })
    .on("mousemove", event => {
      tooltip
        .style("left", `${event.pageX + 12}px`)
        .style("top", `${event.pageY - 28}px`);
    })
    .on("mouseleave", function() {
      d3.select(this).attr("r", 4);
      tooltip.style("opacity", 0);
    });

  chart.append("g")
    .attr("class", "axis")
    .attr("transform", `translate(0,${innerHeightS})`)
    .call(d3.axisBottom(xScaleS).ticks(8));

  chart.append("g")
    .attr("class", "axis")
    .call(d3.axisLeft(yScaleS).ticks(8));

  chart.append("text")
    .attr("class", "axis-label")
    .attr("x", innerWidthS)
    .attr("y", innerHeightS + 48)
    .attr("text-anchor", "end")
    .text("Star Rating");

  chart.append("text")
    .attr("class", "axis-label")
    .attr("transform", "rotate(-90)")
    .attr("x", -8)
    .attr("y", -42)
    .attr("text-anchor", "end")
    .text("Labeled Energy Consumption (kWh/year)");
}