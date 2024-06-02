async function fetchAndStoreJSON(url) {
    try {
        const response = await fetch(url); // Fetch the JSON file
        const data = await response.json(); // Extract JSON from the response
        return data; // Return the JSON data
    } catch (error) {
        console.error('Error fetching JSON:', error);
        throw error; // Rethrow the error for handling elsewhere if needed
    }
}



function getActiveChapters(annotationData){
    let active_chapters = new Array(13).fill(0);
    let chapters = annotationData.map(d => d['Chapter'])
    let unique_chapters = [...new Set(chapters)];
    unique_chapters.forEach(element => {
        active_chapters[element] = 1;
    });
    return active_chapters;
}

function getChapterData(annotationData, chapter){
    let chapterData = annotationData.filter(function (d){return d['Chapter'] == chapter});
    if (chapterData.length == 0) return chapterData;
    chapterData = chapterData.sort((a,b) => (a['Page'].localeCompare(b['Page'])))
    return chapterData;
}

function getSections(chapterData){
    let sections = [...new Set(chapterData.map(d => d['Section']))]
    return sections;
}

function getSectionHTMLContent(chapterData, section){
    let sectionData = chapterData.filter(function (d){return d['Section'] == section;});
    let htmlContent = "<div class = 'text-box' id = 'text-box'>" + "<h1>" + section + "</h1>";
    sectionData.forEach(element =>{
        let header = `<h3>Page ` + element['Page'] + ": " + element['Type'] + `</h3>`
        let quote = `<b>Quote:</b> <p><i>` + element['Quote'] + `</i></p>`
        let annotation = `<b>Annotation:</b> <p>` + wrapLinksInAnchorTags(element['Annotation']) + `</p>`
        htmlContent += header + quote + annotation
    })
    htmlContent += "</div>"
    let scrollToSeeMorePrompt = "<div> <p><i> Scroll to see more</i></p> </div>"
    htmlContent+= scrollToSeeMorePrompt
    return htmlContent;
}       

function wrapLinksInAnchorTags(text) {
    // Regular expression to match URLs
    var urlRegex = /(https?:\/\/[^\s]+)/g;

    // Replace URLs with anchor tags
    var newText = text.replace(urlRegex, function(url) {
        return '<a href="' + url + '">' + url + '</a>';
    });
    return newText;
}

function getSectionIntro(sectionIntroData, chapter, section){
    sectionIntroContent = sectionIntroData.filter(function(d){return (d.Chapter == chapter) && (d.Section == section)})
    return sectionIntroContent[0]['Content']
}