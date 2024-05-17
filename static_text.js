var introText = `
<h1> Minding With You </h1>
<h2> Annotations for <i>Mind in Life</i> by Evan Thompson</h2>
<h4> Select A Chapter to Begin </h4>
<p>By the CGSC 253 class at Carleton College, Spring 2024</p>
<p>With Prof. Jay McKinney</p>`

var aboutText = `
<h1> About This Project </h1>
<p>Random Text</p>`

var contactText = `
<h1> Contact Us </h1>
<p>Random Text</p>`


const textContainer = document.getElementById("text-content");

updateHTML(textContainer, introText)

window.addEventListener('load', function(){updateHTML(textContainer, introText)});

const homeButton = document.getElementById("home-button");
homeButton.addEventListener("click", function(){updateHTML(textContainer, introText)});

const aboutButton = document.getElementById("about-button");
aboutButton.addEventListener("click", function(){updateHTML(textContainer, aboutText)});

const contactButton = document.getElementById("contact-button");
contactButton.addEventListener("click", function(){updateHTML(textContainer, contactText)});

function updateHTML(htmlContainer, htmlContent) {
    htmlContainer.innerHTML = htmlContent;
    htmlContainer.classList.remove('fade-in-text'); // Remove the class
    void htmlContainer.offsetWidth; // Trigger reflow
    htmlContainer.classList.add('fade-in-text'); // Add the class back to trigger animation
}