var head = document.head;

var fontLink = document.createElement('link')
fontLink.href = 'https://fonts.googleapis.com/css2?family=Workbench&display=swap'
fontLink.rel = 'stylesheet'
head.appendChild(fontLink)

var style = document.createElement('style');
style.innerHTML = 'body { background-color: black; margin: 5vw; font-family: Workbench; color: greenyellow; }';
head.appendChild(style);

// var body = document.querySelector('body')
var body = document.body;
// body.style.backgroundColor = 'black'
// body.style.margin = '5vw'
// body.style.fontFamily = 'Workbench'
// body.style.color = 'greenyellow'


//Nombre
var introName = document.createElement('h2');
introName.innerText = 'Pinocho Grillo Disney';

document.body.appendChild(introName);


//Breve presentación
var introIntroduction = document.createElement('h3');
introIntroduction.innerText = 'Introduction';

document.body.appendChild(introIntroduction);



var introDescription = document.createElement('p');
introDescription.innerText = "Muñero de madera con aspiraciones de convertirme en un niño real busca empleo para afrontar nuevos retos";

document.body.appendChild(introDescription);


//Certificaciones académicas - lista
var certificationsTitle = document.createElement('h3');
certificationsTitle.innerText = 'Certifications';

document.body.appendChild(certificationsTitle);



var certificationsList = document.createElement('ul');


var certificationsItem1 = document.createElement('li');
certificationsItem1.innerText = 'Licenciado en Muñecos de Madera - Universidad Disney (USA)';

certificationsList.appendChild(certificationsItem1);

document.body.appendChild(certificationsList);


var certificationsItem2 = document.createElement('li');
certificationsItem2.innerText = 'Master en Títeres - Escuela oficial de Entretenimiento infantil';

certificationsList.appendChild(certificationsItem2);

document.body.appendChild(certificationsList);


//Experiencia
var experienceTitle = document.createElement('h3');
experienceTitle.innerText = 'Experience';

document.body.appendChild(experienceTitle);


var experienceList = document.createElement('ul');


var experienceItem1 = document.createElement('li');
experienceItem1.innerText = 'Muñeco de madera';

experienceList.appendChild(experienceItem1);

document.body.appendChild(experienceList);



var experienceItem2 = document.createElement('li');
experienceItem2.innerText = 'Burro de circo';

experienceList.appendChild(experienceItem2);

document.body.appendChild(experienceList);



var experienceItem3 = document.createElement('li');
experienceItem3.innerText = 'Alimento de ballena';

experienceList.appendChild(experienceItem3);

document.body.appendChild(experienceList);



var experienceItem4 = document.createElement('li');
experienceItem4.innerText = 'Niño real';

experienceList.appendChild(experienceItem4);

document.body.appendChild(experienceList);


//Idiomas
var langTitle = document.createElement('h3');
langTitle.innerText = 'Languajes';

document.body.appendChild(langTitle);


var langList = document.createElement('ol');


var langItem1 = document.createElement('li');
langItem1.innerText = 'English - (Mother tongue)';

langList.appendChild(langItem1);

document.body.appendChild(langList);


var langItem2 = document.createElement('li');
langItem2.innerText = 'Spanish';

langList.appendChild(langItem2);

document.body.appendChild(langList);


var langItem3 = document.createElement('li');
langItem3.innerText = 'Italian';

langList.appendChild(langItem3);

document.body.appendChild(langList);



// Datos de contacto - Footer
var footer = document.createElement('footer')
footer.innerText = 'Tlf: +34 000 00 00 - email: pinochoGD@ISDI.com'

document.body.appendChild(footer)



//Nuevo
var experiencesList = document.createElement ('ul');
var experiencesItem1 = document.createElement('li');
experiencesItem1.innetText = 'Software Architect (Microsoft, 2020)';
experiencesList.appendChild(experiencesItem1);

var experiencesItem2 = document.createElement('li');
experiencesItem2.innetText = 'Software Engeneer (Facebook, 2015)';
experiencesList.appendChild(experiencesItem2);

var experiencesItem3 = document.createElement('li');
experiencesItem3.innetText = 'Software Developer (Twitter, 2008)';
experiencesList.appendChild(experiencesItem3);