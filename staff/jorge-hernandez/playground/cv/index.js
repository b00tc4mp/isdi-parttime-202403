var studiesArr = [
  "Diseño Industrial con Autocad",
  "Animación y modelado 3d",
  "Microinformática y redes",
  "Full Stack Developer Bootcamp. Actualmente en proceso para adquirir habilidades avanzadas de desarrollo web y de aplicaciones para complementar mi experiencia en soporte técnico y avanzar en mi carrera profesional.",
];
var experienceArr = [
  "Responsable de proporcionar soporte técnico integral, resolver problemas complejos y mantener la infraestructura de TI para garantizar operaciones comerciales fluidas(Iberojet, Pullmantur Cruises, Balearia)",
  "Soporte Técnico en Accom (Actualmente) Ofreciendo soluciones técnicas efectivas tanto de forma presencial como remota para garantizar la eficiencia operativa y la satisfacción del cliente en un entorno empresarial.",
];

var skillsArr = [
  "Soporte técnico",
  "Resolución de problemas",
  "Comunicación efectiva",
  "gestión de CRM",
  "Desarrollo completo HTML, CSS, JavaScript ...",
];

var title = document.querySelector("title");
title.textContent = "CV - Jorge Hernández";

var principalTitle = document.createElement("h1");
principalTitle.textContent = "Jorge Hernández";
document.body.appendChild(principalTitle);

var aboutMe = document.createElement("h2");
aboutMe.textContent = "Acerca de mi";
document.body.appendChild(aboutMe);

var myDescription = document.createElement("p");
myDescription.textContent =
  "Pasión por la tecnología con una sólida experiencia en soporte técnico, gestión de CRM's y énfasis en programación full-stack";
document.body.appendChild(myDescription);

var studiesTitle = document.createElement("h2");
studiesTitle.textContent = "Certificaciones";
document.body.appendChild(studiesTitle);

var studiesList = document.createElement("ul");
document.body.appendChild(studiesList);

for (var i = 0; i < studiesArr.length; i++) {
  var studiesItem = document.createElement("li");
  studiesItem.textContent = studiesArr[i];
  studiesList.appendChild(studiesItem);
}

var experience = document.createElement("h2");
experience.textContent = "Experiencia";
document.body.appendChild(experience);

var experienceList = document.createElement("ul");
document.body.appendChild(experienceList);

for (var i = 0; i < experienceArr.length; i++) {
  var experienceItem = document.createElement("li");
  experienceItem.textContent = experienceArr[i];
  experienceList.appendChild(experienceItem);
}

var skills = document.createElement("h2");
skills.textContent = "Habilidades";
document.body.appendChild(skills);

var skillsList = document.createElement("ul");
document.body.appendChild(skillsList);

for (var i = 0; i < skillsArr.length; i++) {
  var skillsItem = document.createElement("li");
  skillsItem.textContent = skillsArr[i];
  skillsList.appendChild(skillsItem);
}

var footer = document.createElement("footer");
footer.textContent = "Made by Jorge Hernández";
document.body.appendChild(footer);
