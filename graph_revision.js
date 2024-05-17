//Stage 0: home page; Stage 1: Chapter & Topics; Stage 2: Annotations
var stage;

var nodes, links;
var svg, link, node, nodeLabels;
var centerX, centerY;
var simulation;

const numNodes = 14
const graphR = 300, circleR = 50;

//whether each chapter is active. the 0th entry is always 0;
const isChapterActive = [0, 1, 1, 1, 1, 0, 0, 0, 1, 1, 0, 0, 1, 1]
//A color scheme based om how the chapters are grouped
const nodeColors = ["lightgray","#EDB4E9", "#EDB4E9", "#EDB4E9", "#EDB4E9", "#00C6AA", "#00C6AA", "#00C6AA", "#70D6FF", "#70D6FF", "#70D6FF", "#70D6FF", "#70D6FF", "#70D6FF"]

function stage1(){
    nodes = d3.range(numNodes).map(d => ({ id: d, isToggled : 0}));
    links = d3.range(numNodes).map((d, i) => ({ source: i, target: 0 }));

    svg = d3.select("svg");

    link = svg.selectAll(".link")
        .data(links)
        .enter().append("line")
        .attr("class", "link");

    node = svg.selectAll(".node")
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

    nodeLabels = svg.selectAll(".node-label")
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

    function findNode(i){
        var circle = node.filter(function(data, index) {
          return index === i.index;
        });
        return circle
    } 
    function updateNodes(){
        if(stage == 0){
          nodes[0].fx = centerX;
          nodes[0].fy = centerY;
          const angleStep = (2 * Math.PI) / (numNodes - 1); // excluding the center node
          for (let i = 1; i < numNodes; i++) {
              const angle = (i - 1) * angleStep - Math.PI/2;
              nodes[i].fx = centerX + graphR * Math.cos(angle);
              nodes[i].fy = centerY + graphR * Math.sin(angle);
          }
        } 
    }  
}