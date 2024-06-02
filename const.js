var stage;

var isChapterActive = [];

const nodeColors = ["lightgray","#EDB4E9", "#EDB4E9", "#EDB4E9", "#EDB4E9", "#00C6AA", "#00C6AA", "#00C6AA", "#70D6FF", "#70D6FF", "#70D6FF", "#70D6FF", "#70D6FF", "#70D6FF"];
const numChapters = 13;

// const annotationDataPath = './annotation.json';
// const chapterIntroDataPath = './chapterintro.json';
// const sectionIntroDataPath = './sectionintro.json';
// var annotationData, chapterIntroData, sectionData;

const introText = `
<h1> Minding With You </h1>
<h2> Annotations for <i>Mind in Life</i> by Evan Thompson</h2>
<h4> Select A Chapter to Begin </h4>
<p>By the CGSC 253 class at Carleton College, Spring 2024</p>
<p>With Prof. Jay McKinney</p>`

const aboutText = `
<h1> About This Project </h1>
<p>Random Text</p>`
const contactText = `
<h1> Contact Us </h1>
<p>Random Text</p>`

const textContainer = document.getElementById("text-content")
const homeButton = document.getElementById("home-button");
const aboutButton = document.getElementById("about-button");
const contactButton = document.getElementById("contact-button");
const svg = d3.select("#visualization");
var selectedChapterData;