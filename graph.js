const numNodes = 14
// Generate random data for nodes and links
var nodes = d3.range(numNodes).map(d => ({ id: d, isToggled : 0}));
var links = d3.range(numNodes).map((d, i) => ({ source: i, target: 0 }));
const radius = 300, r = 50;
var centerX, centerY;
var simulation;
const isChapterActive = [0, 1, 1, 1, 1, 0, 0, 0, 1, 1, 0, 0, 1, 1]
const nodeColors = ["lightgray","#EDB4E9", "#EDB4E9", "#EDB4E9", "#EDB4E9", "#00C6AA", "#00C6AA", "#00C6AA", "#70D6FF", "#70D6FF", "#70D6FF", "#70D6FF", "#70D6FF", "#70D6FF"]

// Create SVG elements
var svg = d3.select("svg");
var link = svg.selectAll(".link")
    .data(links)
    .enter().append("line")
    .attr("class", "link");
var node = svg.selectAll(".node")
    .data(nodes)
    .enter().append("circle")
    .attr("class", "node")
    .attr("r", 50)
    .attr("fill", function(d){
      if(isChapterActive[d.id] === 0) return nodeColors[0]
      return nodeColors[d.id];
    })
    .on("mouseover", handleMouseOver)
    .on("mouseout", handleMouseOut)// Increase node size
    .on("click", toggleConnections)
    .each(function(d) {
      d.originalColor = d.color;
  });

var nodeLabels = svg.selectAll(".node-label")
  .data(nodes)
  .enter().append("text")
  .attr("class", "node-label")
  .attr("text-anchor", "middle")
  .attr("dominant-baseline", "middle")
  .attr("fill", "white")
  .attr("dy", ".12em") // Adjust vertical alignment
  .attr("dx", "-.05em") // Adjust vertical alignment
  .text(function(d){if(d.id != 0) return d.id;})
  .on("mouseover", function(d, i) {
      if(isChapterActive[i.index] === 0) return
      d3.select(this).style("cursor", "pointer");
      findNode(i).node().dispatchEvent(new Event("mouseover"));
  })
  .on("click", function(d, i) {
    findNode(i).node().dispatchEvent(new Event("click"));
  });
updateNodes()

window.addEventListener('load', createSimulation);
window.addEventListener('resize', createSimulation);

// Function to update simulation center on window resize
function createSimulation() {
  var container = document.getElementById('svg container').getBoundingClientRect();
  centerX = container.left + container.width/2;
  centerY = container.top + container.height/2 - 150;
  updateNodes()
  simulation = d3.forceSimulation(nodes)
      .force("link", d3.forceLink(links).id(d => d.id).distance(300))
      .force("charge", d3.forceManyBody().strength(-100)) // Increase repulsion between nodes
      .force("center", d3.forceCenter(centerX, centerY))
      .on("tick", () => {
          link
          .attr("x1", d => d.source.x)
          .attr("y1", d => d.source.y)
          .attr("x2", d => d.target.x)
          .attr("y2", d => d.target.y);
          node
          .attr("cx", d => d.x)
          .attr("cy", d => d.y);
          nodeLabels
          .attr("x", d => d.x)
          .attr("y", d => d.y);
      });
}

function updateNodes(){
  nodes[0].fx = centerX;
  nodes[0].fy = centerY;
  const angleStep = (2 * Math.PI) / (numNodes - 1); // excluding the center node
  for (let i = 1; i < numNodes; i++) {
      const angle = (i - 1) * angleStep - Math.PI/2;
      nodes[i].fx = centerX + radius * Math.cos(angle);
      nodes[i].fy = centerY + radius * Math.sin(angle);
  }
}

function findNode(i){
  var circle = node.filter(function(data, index) {
    return index === i.index;
  });
  return circle
}

// Handle mouseover event
function handleMouseOver(d, i) {
  if(isChapterActive[i.id] === 0) return
  d3.select(this).style("cursor", "pointer");
  if(i.isToggled) return
  d3.select(this).style("fill", "#ffd7b5");
}

// Handle mouseout event
function handleMouseOut(d, i) {
  d3.select(this).style("cursor", "default");
  if(i.isToggled) return
  d3.select(this).style("fill", d.originalColor);
}

function toggleConnections(d, i) {
  if(isChapterActive[i.id] === 0) return
  i.isToggled = 1 - i.isToggled
  d3.select(this).style("fill", "orange");  
}