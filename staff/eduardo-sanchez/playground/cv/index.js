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

var experienceList = document.createElement('ul')

var experienceItem1 = document.createElement('li')
experienceItem1.innerText = "Practicas en Google (Python department)"

experienceList.appendChild(experienceItem1)

var experienceItem2 = document.createElement('li')

experienceItem2.innerText = "Profesor apoyo alumnos Bootcamp(ISDI Coders)"

experienceItem1.appendChild(experienceItem2)

document.body.appendChild(experienceList)









