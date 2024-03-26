var title = document.querySelector("title");
title.innerText = "Cv JS-to-HTML";

var bodyHeader = document.createElement("h1");
bodyHeader.innerText = "Welcome to my practice";

document.body.appendChild(bodyHeader);

var introParraph = document.createElement("p");
introParraph.innerText =
  "Esto es una prueba de crear un contenido HTML desde JavaScript, creando variables y agregandolas al elemento body.";

document.body.appendChild(introParraph);

var secondHeader = document.createElement("h2");
secondHeader.innerText = "Skills";

document.body.appendChild(secondHeader);

var skillList = document.createElement("ul");

var skill1 = document.createElement("li");
skill1.innerText = "Full Stack Developer";

skillList.appendChild(skill1);

var skill2 = document.createElement("li");
skill2.innerText = "Problem solution";

skillList.appendChild(skill2);

document.body.appendChild(skillList)

var footerText = document.createElement("footer");
footerText.innerText = "Have a fun in playground ";

document.body.appendChild(footerText);
