// (async () => {
//   try {
//     annotationData = await fetchAndStoreJSON(annotationDataPath);
//     chapterIntroData = await fetchAndStoreJSON(chapterIntroDataPath);
//     sectionIntroData = await fetchAndStoreJSON(sectionIntroDataPath);
//     // Generate random data for nodes and links
//     
//   } catch (error) {
//       console.error('An Error Occurred: ', error);
//   }
// })();  

stage = 0;
isChapterActive = getActiveChapters(annotationData)
// Initial drawing of the circles
drawChapters();
updateHTML(textContainer, introText);

// Redraw circles on window resize
window.addEventListener("resize", resize);

homeButton.addEventListener("click", function(){initStage0();});
aboutButton.addEventListener("click", function(){updateHTML(textContainer, aboutText)});
contactButton.addEventListener("click", function(){updateHTML(textContainer, contactText)});

function updateHTML(htmlContainer, htmlContent) {
    htmlContainer.innerHTML = htmlContent;
    htmlContainer.classList.remove('fade-in-text'); // Remove the class
    void htmlContainer.offsetWidth; // Trigger reflow
    htmlContainer.classList.add('fade-in-text'); // Add the class back to trigger animation
}

function resize(){
  if (stage == 0){initStage0()}
  if (stage == 1){initStage1()}
}


