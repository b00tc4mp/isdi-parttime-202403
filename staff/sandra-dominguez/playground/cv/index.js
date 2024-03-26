var headTitle = document.querySelector('title')
headTitle.innerText = 'CV - Sandra DS'

var title = document.createElement('h1')
title.innerText = headTitle.innerText

document.body.appendChild(title)

var introTitle = document.createElement('h2')
introTitle.innerText = 'Intro'

document.body.appendChild(introTitle)

var introDescription = document.createElement('p')
introDescription.innerText = 'Soy aficionada a la montaña y estar desconectada unas horas de la rutina'

document.body.appendChild(introDescription)

var certificationsTitle = document.createElement('h2')
certificationsTitle.innerText = 'Certifications'

document.body.appendChild(certificationsTitle)

var certificationsList = document.createElement('ul')

var certificationItem1 = document.createElement('li')
certificationItem1.innerText = 'Scrum Master'

certificationsList.appendChild(certificationItem1)

var certificationItem2 = document.createElement('li')
certificationItem2.innerText = 'Full Stack development (ISDI Coders)'

certificationsList.appendChild(certificationItem2)

document.body.appendChild(certificationsList)

var experienceTitle = document.createElement('h2')
experienceTitle.innerText = 'Experience'

document.body.appendChild(experienceTitle)

var experienceList = document.createElement('ul')

var experienceItem1 = document.createElement('li')
experienceItem1.innerText = 'FreeCodeCamp'

experienceList.appendChild(experienceItem1)

var experienceItem2 = document.createElement('li')
experienceItem2.innerText = 'ISDI Coders'

experienceList.appendChild(experienceItem2)

document.body.appendChild(experienceList)

var projectTitle = document.createElement('h2')
projectTitle.innerText = 'Projecto'

document.body.appendChild(projectTitle)

var projectDescription = document.createElement('p')
projectDescription.innerText = 'Mejorar mis habilidades poco a poco.'

document.body.appendChild(projectDescription)