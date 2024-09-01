var head = document.head;
var body = document.body;

var fontLink = document.createElement("link");
fontLink.href = "https://fonts.googleapis.com/css2?family=Rakkas&display=swap";
fontLink.rel = "styleSheet";

head.appendChild(fontLink);

body.style.fontFamily = "Rakkas";

body.style.background = "#1f1f1f";
body.style.color = "#8685EF";

body.style.maxWidth = "1366px";
body.style.margin = "auto";
body.style.padding = "20px";

var headTitle = document.querySelector("title");
headTitle.innerText = "J0SE P0Z0 - CV";

var section1 = document.createElement("section");

section1.style.display = "flex";
section1.style.justifyContent = "space-between";

var title = document.createElement("h1");
title.innerText = headTitle.innerText;
title.style.fontSize = "32px";
title.style.display = "flex";
title.style.alignItems = "flex-end";

var profileImage = document.createElement("img");
profileImage.src = "https://cdn-icons-png.flaticon.com/512/149/149071.png";
profileImage.style.width = "100px";
profileImage.style.padding = "10px";

section1.appendChild(title);
section1.appendChild(profileImage);

body.appendChild(section1);

var lineBreak = document.createElement("hr");

body.appendChild(lineBreak);

var summaryTitle = document.createElement("h2");
summaryTitle.innerText = "Summary";
summaryTitle.style.textDecoration = "underline";

body.appendChild(summaryTitle);

var aboutMeParagraph = document.createElement("p");
aboutMeParagraph.innerText =
  "Hey there! 👋 I'm Jose, a passionate fullstack developer with a keen interest in creating efficient and innovative solutions to real-world problems. With 12 years of experience in the industry, I've had the opportunity to work on a variety of projects, ranging from web and mobile applications to backend systems and APIs.\n I thrive in collaborative environments where creativity and teamwork are valued. I enjoy diving into challenging problems, brainstorming solutions with my teammates, and seeing ideas come to life through code.\n I'm currently open to new opportunities and excited about the possibility of contributing to meaningful projects with a talented team. Let's connect and discuss how we can work together!";
aboutMeParagraph.style.color = "#A9CEC2";
body.appendChild(aboutMeParagraph);

var lineBreak = document.createElement("hr");

body.appendChild(lineBreak);

var section3 = document.createElement("section");
body.appendChild(section3);
section3.style.display = "flex";
section3.style.justifyContent = "space-between";

var section3TS = document.createElement("div");

var techStackTitle = document.createElement("h2");
techStackTitle.innerText = "Tech Stack";
techStackTitle.style.textDecoration = "underline";

section3TS.appendChild(techStackTitle);

var techStack = [
  "Languages:_____JavaScript (Node.js) / Python / Java",
  "Frontend:______React / Angular / HTML / CSS",
  "Backend:_______Express.js / Django / Spring Boot",
  "Databases:_____MongoDB / PostgreSQL / MySQL",
  "DevOps:________Docker / Kubernetes / AWS",
];

for (var i = 0; i < techStack.length; i++) {
  var everyTech = techStack[i];

  var tech = document.createElement("p");
  tech.style.color = "#A9CEC2";

  tech.innerText = everyTech;
  section3TS.appendChild(tech);
}

section3.appendChild(section3TS);

var section3WE = document.createElement("div");
section3WE.style.textAlign = "center";

var experienceTitle = document.createElement("h2");
experienceTitle.innerText = "Work Experience";
experienceTitle.style.textDecoration = "underline";

section3WE.appendChild(experienceTitle);

var experiences = [
  "Software Developer (2024)",
  "Frontend Developer (2022)",
  "Backend Developer (2020)",
];

for (var i = 0; i < experiences.length; i++) {
  var everyExperience = experiences[i];

  var experience = document.createElement("p");
  experience.style.color = "#A9CEC2";

  experience.innerText = everyExperience;

  section3WE.appendChild(experience);
}

section3.appendChild(section3WE);

var section3S = document.createElement("div");
section3S.style.textAlign = "end";

var studiesTitle = document.createElement("h2");
studiesTitle.innerText = "Studies";
studiesTitle.style.textDecoration = "underline";

section3S.appendChild(studiesTitle);

var studies = ["Web Development (2024)", "Graphic design (2022)"];

for (var i = 0; i < studies.length; i++) {
  var everyStudy = studies[i];

  var study = document.createElement("p");
  study.style.color = "#A9CEC2";

  study.innerText = everyStudy;

  section3S.appendChild(study);
}

section3.appendChild(section3S);

var lineBreak = document.createElement("hr");

body.appendChild(lineBreak);
