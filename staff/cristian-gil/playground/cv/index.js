var head = document.head;
var body = document.body;

var fontLink = document.createElement('link')
fontLink.href = 'https://fonts.cdnfonts.com/css/new-walt-disney-font'
fontLink.rel = 'stylesheet'
document.head.appendChild(fontLink)

var style = document.createElement('style');
style.innerHTML = 'body { background-color: blue; color:white}';
head.appendChild(style);

//Nombre
var introName = document.createElement('h2');
introName.innerText = 'Pinocho Grillo';
introName.style.textDecoration = 'underline overline double';
introName.style.textAlign = 'center';
introName.style.fontFamily = 'New Walt Disney Font', 'sans-serif';
introName.style.display = 'inline-block';
introName.style.fontSize = '30.88pt';
body.appendChild(introName);

//Foto
var img = document.createElement('img');
img.src = 'https://i.pinimg.com/236x/2e/96/a3/2e96a310764d4551e67f00635ba07bc4.jpg';
document.body.appendChild(img);


//Breve presentación
var introIntroduction = document.createElement('h3');
introIntroduction.innerText = 'Introduction';
introIntroduction.style.textDecoration = 'underline double';

body.appendChild(introIntroduction);



var introDescription = document.createElement('p');
introDescription.innerText = "Muñero de madera con aspiraciones de convertirme en un niño real busca empleo para afrontar nuevos retos";

body.appendChild(introDescription);


//Certificaciones académicas - lista
var certificationsTitle = document.createElement('h3');
certificationsTitle.innerText = 'Certifications';
certificationsTitle.style.textDecoration = 'underline double';

body.appendChild(certificationsTitle);



var certificationsList = document.createElement('ul');


var certificationsItem1 = document.createElement('li');
certificationsItem1.innerText = 'Licenciado en Muñecos de Madera - Universidad Disney (USA)';

certificationsList.appendChild(certificationsItem1);

body.appendChild(certificationsList);


var certificationsItem2 = document.createElement('li');
certificationsItem2.innerText = 'Master en Títeres - Escuela oficial de Entretenimiento infantil';

certificationsList.appendChild(certificationsItem2);

body.appendChild(certificationsList);


//Experiencia
var experienceTitle = document.createElement('h3');
experienceTitle.innerText = 'Experience';
experienceTitle.style.textDecoration = 'underline double';

body.appendChild(experienceTitle);


var experienceList = document.createElement('ul');


var experienceItem1 = document.createElement('li');
experienceItem1.innerText = 'Muñeco de madera';

experienceList.appendChild(experienceItem1);

body.appendChild(experienceList);



var experienceItem2 = document.createElement('li');
experienceItem2.innerText = 'Burro de circo';

experienceList.appendChild(experienceItem2);

body.appendChild(experienceList);



var experienceItem3 = document.createElement('li');
experienceItem3.innerText = 'Alimento de ballena';

experienceList.appendChild(experienceItem3);

body.appendChild(experienceList);



var experienceItem4 = document.createElement('li');
experienceItem4.innerText = 'Niño real';

experienceList.appendChild(experienceItem4);

body.appendChild(experienceList);


//Idiomas
var langTitle = document.createElement('h3');
langTitle.innerText = 'Languajes';
langTitle.style.textDecoration = 'underline double';

body.appendChild(langTitle);


var langList = document.createElement('ol');


var langItem1 = document.createElement('li');
langItem1.innerText = 'English - (Mother tongue)';

langList.appendChild(langItem1);

body.appendChild(langList);


var langItem2 = document.createElement('li');
langItem2.innerText = 'Spanish';

langList.appendChild(langItem2);

body.appendChild(langList);


var langItem3 = document.createElement('li');
langItem3.innerText = 'Italian';

langList.appendChild(langItem3);

body.appendChild(langList);



// Datos de contacto - Footer
var footer = document.createElement('footer')
footer.innerText = 'Tlf: +34 000 00 00 - email: pinochoGD@ISDI.com'
footer.style.textDecoration = 'underline overline'

body.appendChild(footer)



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