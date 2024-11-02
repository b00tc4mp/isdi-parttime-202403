var headTitle = document.querySelector('title');

headTitle.innerText = 'CV - Eduardo Sanchez';

var title = document.createElement('h1');
title.innerText = headTitle.innerText

document.body.appendChild(title);

var introTitle = document.createElement('h2')
introTitle.innerText = 'Intro'

document.body.appendChild(introTitle)

var introDescription = document.createElement('p')
introDescription.innerText = " Estoy aprendiendo programacion de paginas web"

document.body.appendChild(introDescription)

var certificationsTitle = document.createElement('h2')
certificationsTitle.innerText = "Certifications"

document.body.appendChild(certificationsTitle)

var certificationsList = document.createElement('ul')

var certificationItem1 = document.createElement('li')
certificationItem1.innerText = 'Responsive Web Design (FreeCodeCamp)'

certificationsList.appendChild(certificationItem1)

var certificationItem2 = document.createElement('li')
certificationItem2.innerText = 'Full-Stack Developer (ISDI Coders)'

certificationsList.appendChild(certificationItem2)

document.body.appendChild(certificationsList)

var experienceTitle = document.createElement('h2')
experienceTitle.innerText = 'Experience'

document.body.appendChild(experienceTitle)

var experiencesList = document.createElement('ul')

var experienceItem1 = document.createElement('li')
experienceItem1.innerText = "Practicas en Google (Python department)"

experiencesList.appendChild(experienceItem1)

var experienceItem2 = document.createElement('li')

experienceItem2.innerText = "Profesor apoyo alumnos Bootcamp(ISDI Coders)"

experiencesList.appendChild(experienceItem2)

var experienceItem3 = document.createElement('li')
experienceItem3.innerText = " Software Developer (Microsoft, 2022)"

experiencesList.appendChild(experienceItem3)

document.body.appendChild(experiencesList)

/*se puede resumir de esta forma para no tener q ir añadiendo cada elemento de la lista uno a uno**/


// var headTitle = document.querySelector('title');
// headTitle.innerText = 'CV - Eduardo Sanchez';

// var title = document.createElement('h1');
// title.innerText = headTitle.innerText;
// document.body.appendChild(title);

// // Datos para las certificaciones
// var certificationsData = [
//     'Responsive Web Design (FreeCodeCamp)',
//     'Full-Stack Developer (ISDI Coders)'
// ];

// // Crear título para certificaciones
// var certificationsTitle = document.createElement('h2');
// certificationsTitle.innerText = "Certifications";
// document.body.appendChild(certificationsTitle);

// // Crear lista de certificaciones y agregar cada elemento
// var certificationsList = document.createElement('ul');
// for (var i = 0; i < certificationsData.length; i++) {
//     var certificationItem = document.createElement('li');
//     certificationItem.innerText = certificationsData[i];
//     certificationsList.appendChild(certificationItem);
// }
// document.body.appendChild(certificationsList);

// // Datos para la experiencia
// var experienceData = [
//     "Prácticas en Google (Python department)",
//     "Profesor apoyo alumnos Bootcamp (ISDI Coders)",
//     "Software Developer (Microsoft, 2022)"
// ];

// // Crear título para experiencia
// var experienceTitle = document.createElement('h2');
// experienceTitle.innerText = 'Experience';
// document.body.appendChild(experienceTitle);

// // Crear lista de experiencia y agregar cada elemento
// var experienceList = document.createElement('ul');
// for (var j = 0; j < experienceData.length; j++) {
//     var experienceItem = document.createElement('li');
//     experienceItem.innerText = experienceData[j];
//     experienceList.appendChild(experienceItem);
// }
// document.body.appendChild(experienceList);









