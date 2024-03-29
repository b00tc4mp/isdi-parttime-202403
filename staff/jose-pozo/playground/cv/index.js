var head = document.head;
var body = document.body;

var fontLink = document.createElement("link");
fontLink.href = "https://fonts.googleapis.com/css2?family=Rakkas&display=swap";
fontLink.rel = "styleSheet";

head.appendChild(fontLink);

body.style.fontFamily = "Rakkas";

body.style.background = "#1f1f1f";
body.style.color = "#8685EF";

var headTitle = document.querySelector("title");
headTitle.innerText = "JOSE POZO";

var title = document.createElement("h2");
title.innerText = headTitle.innerText;

body.appendChild(title);

var lineBreak = document.createElement("hr");

body.appendChild(lineBreak);

var summaryTitle = document.createElement("h3");
summaryTitle.innerText = "Summary";
summaryTitle.style.textDecoration = "underline";

body.appendChild(summaryTitle);

var aboutMeParagraph = document.createElement("p");
aboutMeParagraph.innerText =
  "Highly motivated professional with a passion for problem-solving and teamwork.";

body.appendChild(aboutMeParagraph);

var experienceTitle = document.createElement("h3");
experienceTitle.innerText = "Work Experience";
experienceTitle.style.textDecoration = "underline";

body.appendChild(experienceTitle);

var experienceList = document.createElement("ul");

var experiences = [
  "Software Developer (2024)",
  "Frontend Developer (2022)",
  "Backend Developer (2020)",
];

for (var i = 0; i < experiences.length; i++) {
  var everyExperience = experiences[i];

  var experience = document.createElement("li");
  experience.innerText = everyExperience;

  experienceList.appendChild(experience);
}

body.appendChild(experienceList);

var studiesTitle = document.createElement("h3");
studiesTitle.innerText = "Studies";
studiesTitle.style.textDecoration = "underline";

body.appendChild(studiesTitle);

var studiesList = document.createElement("ul");

var studies = ["Web Development (2024)", "Graphic design (2022)"];

for (var i = 0; i < studies.length; i++) {
  var everyStudy = studies[i];

  var study = document.createElement("li");
  study.innerText = everyStudy;

  studiesList.appendChild(study);
}

body.appendChild(studiesList);
