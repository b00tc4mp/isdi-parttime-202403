var headTitle = document.querySelector("title");
headTitle.innerText = "CV - Pablo Leal";

var title = document.createElement("h1");
title.innerText = headTitle.innerText;

document.body.appendChild(title);

var selfDescription = document.createElement("p");
selfDescription.innerText = "Soy Pablo, tengo 29 años y vivo en Barcelona";

document.body.appendChild(selfDescription);

var certificationsTitle = document.createElement("h2");
certificationsTitle.innerText = "Certifications";

document.body.appendChild(certificationsTitle);

var certificationsList = document.createElement("ul");

var certificationTour = document.createElement("li");
certificationTour.innerText = "Tourism";
certificationsList.appendChild(certificationTour);

var certificationWebDev = document.createElement("li");
certificationWebDev.innerText = "Web Development ISDI";
certificationsList.appendChild(certificationWebDev);

document.body.appendChild(certificationsList);

var experiencesTitle = document.createElement("h2");
experiencesTitle.innerText = "Previous Experiences";

document.body.appendChild(experiencesTitle);

var experiencesList = document.createElement("ol");

var expHotel = document.createElement("li");
expHotel.innerText = "Hotel";
experiencesList.appendChild(expHotel);

var expTurismo = document.createElement("li");
expTurismo.innerText = "Travel Agency";
experiencesList.appendChild(expTurismo);

var expLogi = document.createElement("li");
expLogi.innerText = "Logistic Company";
experiencesList.appendChild(expLogi);

document.body.appendChild(experiencesList);

var langTitle = document.createElement("h2");
langTitle.innerText = "Languages";

document.body.appendChild(langTitle);

var langList = document.createElement("ul");

var ptLang = document.createElement("li");
ptLang.innerText = "Portuguese";
langList.appendChild(ptLang);

var esLang = document.createElement("li");
esLang.innerText = "Spanish";
langList.appendChild(esLang);

var enLang = document.createElement("li");
enLang.innerText = "English";
langList.appendChild(enLang);

document.body.appendChild(langList);
