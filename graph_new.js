function drawChapters() {
    // Set up SVG dimensions
    const width = svg.node().clientWidth;
    const height = svg.node().clientHeight;
    const centerX = width / 2;
    const centerY = height / 2;
    const radius = Math.min(width, height) / 4;
    const circleRadius = Math.min(width, height) * 0.04; // Radius of the circles

    // Clear existing circles
    svg.selectAll("*").remove();

    // Create data for the circles
    const data_chapters = d3.range(numChapters).map((d, i) => {
        const angle = (i / numChapters) * 2 * Math.PI - Math.PI/2;
        return {
            x: centerX + radius * Math.cos(angle),
            y: centerY + radius * Math.sin(angle),
            color: nodeColors[i + 1],
            index: i + 1,
            isToggled: false
        };
    });

    svg.selectAll(".line")
        .data(data_chapters)
        .enter()
        .append("line")
        .attr("x1", centerX)
        .attr("y1", centerY)
        .attr("x2", d => d.x)
        .attr("y2", d => d.y)
        .attr("stroke", "lightgray")
        .attr("stroke-width", 3);

    // Add the surrounding circles and labels
    const chapters = svg.selectAll(".surrounding-circle")
        .data(data_chapters)
        .enter()
        .append("g")
        .attr("class", "surrounding-circle");

    chapters.append("circle")
        .attr("cx", d => d.x)
        .attr("cy", d => d.y)
        .attr("r", circleRadius)
        .attr("fill", d => getColor(d));

    chapters.append("text")
        .attr("x", d => d.x)
        .attr("y", d => d.y)
        .attr("dy", "0.35em")
        .attr("text-anchor", "middle")
        .attr("fill", "white")
        .attr("font-size", "2vw")
        .text(d => d.index)
        .style("pointer-events", "none"); // Ignore pointer events for the text

    chapters.on("mouseover", handleMouseOverNode)
          .on("mouseout", handleMouseOutNode)
          .on("click", handleClick);

    
    function handleMouseOverNode(event, d) {
        if(isChapterActive[d.index] == 0 || stage == 1) return
        d3.select(this).style("cursor", "pointer");
        d3.select(this).select("circle").style("fill", "#ffd7b5");
        showChapterIntroStage0(d.index)
      }
      
    function handleMouseOutNode(event, d) {
        if(isChapterActive[d.index] == 0 || stage == 1) return
        d3.select(this).style("cursor", "default");
        d3.select(this).select("circle").style("fill", d.color);
        showHomeIntro()
    }

    function handleClick(event, d) {
        if(isChapterActive[d.index] == 0 || stage == 1) return
        stage = 1;
        d3.select(this).select("circle").style("fill", d.color);
        svg.selectAll(".surrounding-circle")
            .filter(node => node.index !== d.index)
            .transition()
            .duration(500)
            .style("opacity", 0)
            .remove();

        svg.selectAll("line")
            .transition()
            .duration(500)
            .style("opacity", 0)
            .remove();

        // Move the clicked node to the left with animation
        const targetX = circleRadius * 3;
        d3.select(this).select("circle")
            .transition()
            .duration(1000)
            .attr("cx", targetX)
            .attr("cy", centerY)

        d3.select(this).select("text")
            .transition()
            .duration(1000)
            .attr("x", targetX)
            .attr("y", centerY)
            .on("end",() => {
                drawSections(d);
            })
    }

}

function drawSections(data){

    selectedChapterData = data;

    const width = svg.node().clientWidth;
    const height = svg.node().clientHeight;
    const circleRadius = Math.min(width, height) * 0.04; // Radius of the circles
    const centerY = height / 2;
    const circleX = circleRadius * 3;
    const circleY = centerY;
    const rectWidth = width * 0.5;
    const rectHeight = height * 0.075;
    const rectSpacing = height *0.05;
    const cornerRadius = rectHeight/5
    const chapterData = getChapterData(annotationData, selectedChapterData.index)
    const sectionNames = getSections(chapterData)
    const numSections = sectionNames.length;
    var isClicked = false;
    var clickedNode = -1;

    svg.selectAll("*").remove();
    // Draw the circle
    svg.append("circle")
        .attr("cx", circleX)
        .attr("cy", centerY)
        .attr("r", circleRadius)
        .attr("fill", getColor(data))
        .transition()
        .ease(d3.easeLinear)
        .on("end", function() {
            var returnButtonGroup = svg.append("g")
            .attr("transform", "translate(0,0)")
            .on("click", initStage0)
            .on("mouseover", function(){d3.select(this).style("cursor", "pointer");})
            .on("mouseout", function(){d3.select(this).style("cursor", "default");});
        
            // Append rectangle for button
            var button = returnButtonGroup.append("rect")
                .attr("x", 10)
                .attr("y", 10)
                .attr("width", 50)
                .attr("height", 50)
                .attr("fill", "lightblue")
                .attr("rx", 5) // Rounded corners
                .attr("ry", 5)
                .style("opacity", 0)
                .transition()
                .duration(500) // Adjust as needed
                .ease(d3.easeLinear)
                .style("opacity", 1);
        
            // Append text for button label
            var buttonText = returnButtonGroup.append("text")
                .attr("x", 35)
                .attr("y", 35)
                .attr("dominant-baseline", "middle")
                .attr("text-anchor", "middle")
                .attr("fill", "white")
                .attr("font-weight", "bold")
                .attr("font-size", "2vw")
                .text("<")
                .style("opacity", 0)
                .transition()
                .duration(500) // Adjust as needed
                .ease(d3.easeLinear)
                .style("opacity", 1);
        
            // Create data for the circles
            const data_sections = d3.range(numSections).map((d, i) => {
                return {
                    index: i,
                    sectionName: sectionNames[i],
                    isToggled: false
                };
            });

            // Draw the rectangles after the circle is drawn
            const rects = svg.selectAll(".rect")
                .data(data_sections)
                .enter()
                .append("rect")
                .attr("class", "rect")
                .attr("id", d =>"rect-" + d.index)
                .attr("x", width/2 - circleX)
                .attr("y", (d, i) => (height / 2) - ((numSections / 2) * (rectHeight + rectSpacing)) + i * (rectHeight + rectSpacing))
                .attr("width", rectWidth)
                .attr("height", rectHeight)
                .attr("rx", cornerRadius)
                .attr("ry", cornerRadius)
                .attr("fill", "none")
                .attr("stroke", "lightgray")
                .attr("stroke-width", 4)
                .style("opacity", 0)
                .transition()
                .duration(500) // Adjust as needed
                .ease(d3.easeLinear)
                .style("opacity", 1);

            // Add text to the rectangles
            rects.each(function(d, i) {
                const rectY = +d3.select(this).attr("y") + rectHeight / 2;
                // Create a foreignObject to contain HTML text for automatic wrapping
                const foreignObject = svg.append("foreignObject")
                    .attr("id", "box-" + d.index)
                    .attr("x", width / 2 - circleX)
                    .attr("y", rectY - rectHeight / 2)
                    .attr("width", rectWidth)
                    .attr("height", rectHeight)
                    .style("opacity", 0)
                    .on("mouseover",  function(){handleMouseOverBox(d.index)})
                    .on("mouseout",  function(){handleMouseOutBox(d.index)})
                    .on("click", function(){handleClick(d.index)})

                // Add a div inside the foreignObject to contain the text
                const div = foreignObject.append("xhtml:div")
                    .style("width", "100%")
                    .style("height", "100%")
                    .style("display", "flex")
                    .style("justify-content", "center")
                    .style("align-items", "center");

                // Add text to the div
                div.append("xhtml:p")
                    .attr("id", "text-" + d.index)
                    .style("margin", "0")
                    .style("font-size", "1.2vw")
                    .style("font-style", "italic")
                    .style("text-align", "center")
                    .style("color", "black")
                    .style("white-space", "normal") // Allow text wrapping
                    .html(sectionNames[i]) // Use .html() for HTML content
                    .on("mouseover", function(){handleMouseOverText(d.index)})

                // Transition for opacity
                foreignObject.transition()
                    .duration(500) // Adjust as needed
                    .ease(d3.easeLinear)
                    .style("opacity", 1);
                
            });
            // Add click event listener to the underlying rectangles
            svg.selectAll(".rect")
            .on("click", function(_, i) {
                handleClick(null, i); // Pass i as the section index
            });
            // Draw the lines after the circle is drawn
            rects.each(function(d, i) {
                const rectY = +d3.select(this).attr("y") + rectHeight / 2;
                svg.append("line")
                    .attr("x1", circleX + circleRadius)
                    .attr("y1", circleY)
                    .attr("x2", width/2 - circleX)
                    .attr("y2", rectY)
                    .attr("stroke", "lightgray")
                    .attr("stroke-width", 2)
                    .style("opacity", 0)
                    .transition()
                    .duration(500) // Adjust as needed
                    .ease(d3.easeLinear)
                    .style("opacity", 1);
            });
        });
        
    svg.append("text")
        .attr("x", circleX)
        .attr("y", centerY)
        .attr("dy", "0.35em")
        .attr("text-anchor", "middle")
        .attr("fill", "white")
        .attr("font-size", "2vw")
        .text(data.index)
        .style("pointer-events", "none"); // Ignore pointer events for the text

    function handleMouseOverText(index) {
        //if(isClicked && clickedNode == index) return;
        d3.select("#text-" + index).style("cursor", "pointer");
    }

    function handleMouseOverBox(index) {
        if(isClicked && clickedNode == index) return;
        d3.select("#box-" + index).style("cursor", "pointer");
        d3.select("#rect-" + index).style("fill", "#ffd7b5");
        let sectionIntro = getSectionIntro(sectionIntroData, selectedChapterData.index, sectionNames[index]);
        let sectionIntroHTML = `<div class = "intro-text">` + sectionIntro + `<b>Click to proceed</b></div>`
        updateHTML(textContainer, sectionIntroHTML)
    }

    function handleMouseOutBox(index) {
        if(isClicked && clickedNode == index) return;
        d3.select("#box-" + index).style("cursor", "default");
        d3.select("#rect-" + index).style("fill", "none");
        if(isClicked) {
            let sectionAnnotations = getSectionHTMLContent(chapterData, sectionNames[clickedNode])
            updateHTML(textContainer, sectionAnnotations)
        }
        else showChapterIntroStage1(selectedChapterData.index)
    }

    function handleClick(index){
        d3.select("#rect-" + clickedNode).style("fill", "none");
        if(isClicked && clickedNode == index) {
            isClicked = false
            clickedNode = -1;
            showChapterIntroStage1(selectedChapterData.index)
            return
        }
        isClicked = true;
        clickedNode = index;
        let sectionAnnotations = getSectionHTMLContent(chapterData, sectionNames[index])
        updateHTML(textContainer, sectionAnnotations)
    }
}

function getColor(d){
    if(isChapterActive[d.index] === 0) return "lightgray"
    return d.color;
}

function showChapterIntroStage1(chapterID){
    let chapterIntroHTML = `<div class = "intro-text">` + chapterIntroData[chapterID - 1].content + `<p><b>Select a Section to Proceed</b></p></div>`
    updateHTML(textContainer, chapterIntroHTML );
}
function showChapterIntroStage0(chapterID){
    let chapterIntroHTML = `<div class = "intro-text">` + chapterIntroData[chapterID - 1].content + `<p><b>Click to Proceed</b></p></div>`
    updateHTML(textContainer, chapterIntroHTML );
}

function showHomeIntro(){
    updateHTML(textContainer, introText);
}

function initStage0(){
    stage = 0;
    drawChapters();
    showHomeIntro();
}
  
function initStage1(){
    drawSections(selectedChapterData);
    showChapterIntro(selectedChapterData.index)
}

