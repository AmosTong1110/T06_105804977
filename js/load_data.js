function loadTelevisionData() {
  return d3.csv(DATA_FILE, d => ({
    brand: d.brand,
    model: d.model,
    screenSize: Number(d.screenSize),
    screenTech: d.screenTech,
    energyConsumption: Number(d.energyConsumption),
    star: Number(d.star)
  })).then(data => data.filter(d =>
    SCREEN_TYPES.slice(1).includes(d.screenTech) &&
    Number.isFinite(d.energyConsumption) &&
    d.energyConsumption < MAX_ENERGY
  ));
}

loadTelevisionData().then(data => {
  let visibleData = data;
  let selectedTechnology = "All";
  let selectedSize = "All";

  const redrawCharts = () => {
    visibleData = data.filter(d =>
      (selectedTechnology === "All" || d.screenTech === selectedTechnology) &&
      (selectedSize === "All" || d.screenSize === selectedSize)
    );
    drawHistogram(visibleData);
    drawScatterplot(visibleData);
  };

  createScreenFilters(technology => {
    selectedTechnology = technology;
    redrawCharts();
  });
  createSizeFilters(size => {
    selectedSize = size;
    redrawCharts();
  });
  redrawCharts();
  window.addEventListener("resize", redrawCharts);
}).catch(error => {
  d3.select("#histogram, #scatterplot")
    .append("p")
    .text("The TV data could not be loaded. Please run this page from a local web server.");
  console.error("Unable to load TV data:", error);
});