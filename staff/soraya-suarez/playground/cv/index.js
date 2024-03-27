var headTitle = document.querySelector('title');
headTitle.innerText = 'CV - Pepito Grillo';

var title = document.createElement('h1');
title.innerText = headTitle.innerText;

document.body.appendChild(title);

var introTitle = document.createElement('h2');
introTitle.innerText = 'Intro';

document.body.appendChild(introTitle);

var introDescription = document.createElement('p');
introDescription.innerText = "Soy aficionado a la tecla desde que tengo uso de razón... blah blah blah";

document.body.appendChild(introDescription);

var certificationsTitle = document.createElement('h2');
certificationsTitle.innerText = 'Certifications';

document.body.appendChild(certificationsTitle);

var certificationsList = document.createElement('ul');

var certificationsItem1 = document.createElement('li');
certificationsItem1.innerText = 'Scrum Master';

certificationsList.appendChild(certificationsItem1);

document.body.appendChild(certificationsList);

var certificationsItem2 = document.createElement('li');
certificationsItem2.innerText = 'Full Stack Development (ISDI Coders)';

certificationsList.appendChild(certificationsItem2);

document.body.appendChild(certificationsList);

// TODO continue and end CV (Exerience, Projects, ...)

var experienceTitle = document.createElement('h2');
experienceTitle.innerText = 'Experience';

document.body.appendChild(experienceTitle);

var experiencesList = document.createElement('ul');

var experienceItem1 = document.createElement('li');
experienceItem1.innerText = 'Software Architect (Microsoft, 2020)';

experiencesList.appendChild(experienceItem1);

var experienceItem2 = document.createElement('li');
experienceItem2.innerText = 'Software Engineer (Facebook, 2015)';

experiencesList.appendChild(experienceItem2);

var experienceItem3 = document.createElement('li');
experienceItem3.innerText = 'Software Developer (Twitter, 2008)';

experiencesList.appendChild(experienceItem3);

document.body.appendChild(experiencesList);