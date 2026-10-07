const DATA_FILE = "data/Ex6_TVdata.csv";
const MAX_ENERGY = 1800;
const ENERGY_BIN_SIZE = 200;
const SCREEN_TYPES = ["All", "LED", "LCD", "OLED"];
const SCREEN_SIZES = ["All", 24, 32, 55, 65, 98];

const energyBinGenerator = d3.bin()
  .value(d => d.energyConsumption)
  .domain([0, MAX_ENERGY])
  .thresholds(d3.range(0, MAX_ENERGY + ENERGY_BIN_SIZE, ENERGY_BIN_SIZE));

const marginS = { top: 40, right: 30, bottom: 60, left: 70 };
const widthS = 800;
const heightS = 440;
const innerWidthS = widthS - marginS.left - marginS.right;
const innerHeightS = heightS - marginS.top - marginS.bottom;
const innerChartS = d3.select("#scatterplot");
const xScaleS = d3.scaleLinear().range([0, innerWidthS]);
const yScaleS = d3.scaleLinear().range([innerHeightS, 0]);
const tooltipWidth = 190;
const tooltipHeight = 86;
const colorScale = d3.scaleOrdinal()
  .domain(SCREEN_TYPES.slice(1))
  .range(["#2563eb", "#f59e0b", "#10b981"]);