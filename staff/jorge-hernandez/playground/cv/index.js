var studiesArr = ["xxx", "yyy", "zzz", "www", "ttt"];
var experienceArr = [4242, 724678, 289857, 8997];

var title = document.querySelector("title");
title.textContent = "CV - Jorge";

var principalTitle = document.createElement("h1");
principalTitle.textContent = "CV - Jorge";
document.body.appendChild(principalTitle);

var aboutMe = document.createElement("h2");
aboutMe.textContent = "Acerca de mi";
document.body.appendChild(aboutMe);

var myDescription = document.createElement("p");
myDescription.textContent = "Apasionado de los ordenadores";
document.body.appendChild(myDescription);

var studiesTitle = document.createElement("h2");
studiesTitle.textContent = "Titulos";
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
