(async () => {
  // Replace 'username/repo' with your GitHub username and repository name
  const repo = 'DakePeng/mindingwithyou';
  // Replace 'path/to/your.json' with the path to your JSON file in the repository
  const jsonFilePath = 'annotation.json';
  const response = await fetch(`https://raw.githubusercontent.com/${repo}/main/${jsonFilePath}`, { mode: 'no-cors' })
  const docData = await response.json();
  console.log(docData)

  try {
    annotationData = await fetchAndStoreJSON(annotationDataPath);
    chapterIntroData = await fetchAndStoreJSON(chapterIntroDataPath);
    sectionIntroData = await fetchAndStoreJSON(sectionIntroDataPath);
    // Generate random data for nodes and links
    isChapterActive = getActiveChapters(annotationData)
  } catch (error) {
      console.error('An Error Occurred: ', error);
  }
  getSectionIntro(sectionIntroData, 3, "Intro")
  stage = 0;
  // Initial drawing of the circles
  drawChapters();
  updateHTML(textContainer, introText);

  // Redraw circles on window resize
  window.addEventListener("resize", resize);

  homeButton.addEventListener("click", function(){initStage0();});
  aboutButton.addEventListener("click", function(){updateHTML(textContainer, aboutText)});
  contactButton.addEventListener("click", function(){updateHTML(textContainer, contactText)});
  // createSimulation();
})();

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


