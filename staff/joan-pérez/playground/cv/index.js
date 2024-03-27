var certifications = [
  "jiajsijaid",
  "jijdijdiajdij",
  "ijadjiajdiaj",
  "ajsodjoasjsdojd",
];
var experience = [
  "jsdijfdijfdjfjdsjf",
  "ksdsdifjsdifji",
  "kdcdsjkcdkcds",
  "mdososdkfodsofk",
];
var languages = ["Castellano", "Catalan", "Inglés"];

var headTitle = document.querySelector("title");
headTitle.innerText = "CV - Joan Pérez";

var title = document.createElement("h1");
title.innerText = headTitle.innerText;

document.body.appendChild(title);

var intro = document.createElement("h2");
intro.innerText = "Sobre mi";

document.body.appendChild(intro);

var introAboutMe = document.createElement("p");
introAboutMe.innerText = "Dolores fuertes de barriga";

document.body.appendChild(introAboutMe);

var certificationsTitle = document.createElement("h2");
certificationsTitle.innerText = "Certifications";

document.body.appendChild(certificationsTitle);

var certificationsList = document.createElement("ul");
document.body.appendChild(certificationsList);

for (var i = 0; i < certifications.length; i++) {
  var certificate = document.createElement("li");
  certificate.innerText = certifications[i];
  certificationsList.appendChild(certificate);
}

var experienceTitle = document.createElement("h2");
experienceTitle.innerText = "Experience";

document.body.appendChild(experienceTitle);

var experienceList = document.createElement("ul");
document.body.appendChild(experienceList);

for (var i = 0; i < experience.length; i++) {
  var experienceItem = document.createElement("li");
  experienceItem.innerText = experience[i];
  experienceList.appendChild(experienceItem);
}

var languagesTitle = document.createElement("h2");
languagesTitle.innerText = "Languages";

document.body.appendChild(languagesTitle);

var languagesList = document.createElement("ul");
document.body.appendChild(languagesList);

for (var i = 0; i < languages.length; i++) {
  var language = document.createElement("li");
  language.innerText = languages[i];
  languagesList.appendChild(language);
}
