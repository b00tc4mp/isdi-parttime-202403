document.title = 'CV - Adrian Martin Gonzalo';

var title = document.createElement('h1');
title.innerText = 'CV - Adrian Martin Gonzalo';
document.body.appendChild(title);

var introTitle = document.createElement('h2');
introTitle.innerText = 'Intro';
document.body.appendChild(introTitle);

var introDescription = document.createElement('p');
introDescription.innerText = 'Aquí puedes agregar una descripción sobre ti.';
document.body.appendChild(introDescription);

var certificationTitle = document.createElement('h2');
certificationTitle.innerText = 'Certificaciones';
document.body.appendChild(certificationTitle);

var certificationList = document.createElement('ul');

var certificationItem1 = document.createElement('li');
certificationItem1.innerText = 'Preimpresión Digital';
certificationList.appendChild(certificationItem1);

var certificationItem2 = document.createElement('li');
certificationItem2.innerText = 'Full Stack Develop ISDI Coders';
certificationList.appendChild(certificationItem2);

document.body.appendChild(certificationList);

var experienceTitle = document.createElement('h2');
experienceTitle.innerText = 'Experiencia';
document.body.appendChild(experienceTitle);

var experiencesList = document.createElement('ul');

var experienceItem1 = document.createElement('li');
experienceItem1.innerText = 'Dosa - 6 meses';
experiencesList.appendChild(experienceItem1);

var experienceItem2 = document.createElement('li');
experienceItem2.innerText = 'Camarero - 6 meses';
experiencesList.appendChild(experienceItem2);

document.body.appendChild(experiencesList);