var stage;

var isChapterActive = [];

const nodeColors = ["lightgray","#EDB4E9", "#EDB4E9", "#EDB4E9", "#EDB4E9", "#00C6AA", "#00C6AA", "#00C6AA", "#70D6FF", "#70D6FF", "#70D6FF", "#70D6FF", "#70D6FF", "#70D6FF"];
const numChapters = 13;

// const annotationDataPath = './annotation.json';
// const chapterIntroDataPath = './chapterintro.json';
// const sectionIntroDataPath = './sectionintro.json';
// var annotationData, chapterIntroData, sectionData;

const introText = `
<div class = "intro-text">
<h1> Minding With You </h1>
<h2> Annotations for Evan Thompson's book <i>Mind in Life</i>
<h4> Select A Chapter to Begin </h4>
<p>By the CGSC 253 class at Carleton College (Northfield, MN, United States), Spring 2024</p>
<p>With Prof. Jay McKinney</p>
</div>`

const aboutText = `
<div class = "intro-text">
<h1> About This Project </h1>
<p><i>mindingwithyou</i> is the final project of Dake Peng for CGSC 253. It is an interactive webpage that
guides readers through <i>Evan Thompson's</i> book <i>Mind in Life</i>. The website displays introduction
to 7 different chapters of the book and showcases the classes's annotation on different sections.</p>
<p>The introduction to the chapters and sections are written or edited by Dake Peng from various documents
that the class created during the course, and the annotations are created by all members of the class.</p>
</div>`
const contactText = `
<div class = "intro-text">
<h1> Contact Us </h1>
<p>If you are intersted in this project, please contact Dake Peng at
pengd@carleton.com</p>
</div>`

const textContainer = document.getElementById("text-content")
const homeButton = document.getElementById("home-button");
const aboutButton = document.getElementById("about-button");
const contactButton = document.getElementById("contact-button");
const svg = d3.select("#visualization");
var selectedChapterData;