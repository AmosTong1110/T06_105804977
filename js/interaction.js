function createFilterButtons(containerSelector, options, formatLabel, onFilterChange) {
  const container = d3.select(containerSelector);

  container.selectAll("button")
    .data(options)
    .join("button")
    .attr("class", (type, index) => `filter-button${index === 0 ? " active" : ""}`)
    .attr("type", "button")
    .attr("aria-pressed", (type, index) => index === 0 ? "true" : "false")
    .text(formatLabel)
    .on("click", function(event, value) {
      container.selectAll("button")
        .classed("active", buttonValue => buttonValue === value)
        .attr("aria-pressed", buttonValue => buttonValue === value ? "true" : "false");
      onFilterChange(value);
    });
}

function createScreenFilters(onFilterChange) {
  createFilterButtons("#filters_technology", SCREEN_TYPES, type => type, onFilterChange);
}

function createSizeFilters(onFilterChange) {
  createFilterButtons("#filters_size", SCREEN_SIZES, size => size === "All" ? size : `${size}"`, onFilterChange);
}