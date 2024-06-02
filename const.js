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
<h4><i>mindingwithyou</i> is the final project of Dake Peng for CGSC 253. It is an interactive webpage that guides readers through <i>Evan Thompson's</i> book <i>Mind in Life</i>. The website displays introduction to 6 different chapters of the book and showcases the classes's annotation on different sections.</h4>`
const contactText = `
<h1> Contact Us </h1>
<h4>If you are intersted in this project, please contact Dake Peng at pengd@carleton.com</h4>`

const textContainer = document.getElementById("text-content")
const homeButton = document.getElementById("home-button");
const aboutButton = document.getElementById("about-button");
const contactButton = document.getElementById("contact-button");
const svg = d3.select("#visualization");
var selectedChapterData;