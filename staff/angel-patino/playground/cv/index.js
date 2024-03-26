var headTitle = document.querySelector('title')

headTitle.innerText = 'CV - Pepin 22'


var title = document.createElement('h1')
title.innerText = headTitle.innerText

document.body.appendChild(title)

var title = document.createElement('h2')
title.innerText = 'Intro'

document.body.appendChild(title)

var introDescription = document.createElement('p')
introDescription.innerText = "Lalalalal Super pepito"

document.body.appendChild(introDescription)

var certificationsTitle = document.createElement('h2')
certificationsTitle.innerText = "Certificaciones"
document.body.appendChild(certificationsTitle)

var certificationList = document.createElement('ul')

var certificationItem1 = document.createElement('li')
certificationItem1.innerHTML = 'Scrum Master'
var certificationItem2 = document.createElement('li')
certificationItem2.innerHTML = 'Master Of Universe'

certificationList.appendChild(certificationItem1)
certificationList.appendChild(certificationItem2)

document.body.appendChild(certificationList)

var experienceTitle = document.createElement('h2')
experienceTitle.innerText = 'Experiencia anterior'
var experecienceP = document.createElement('p')
experecienceP.innerText = 'Me pase mucho años dando consejos a Pinocho, despues me meti en el mundo IT'

document.body.appendChild(experienceTitle)
document.body.appendChild(experecienceP)

var projectsTitle = document.createElement('h2')
projectsTitle.innerText = 'Proyectos'
var projectsList = document.createElement('ul')
var projectsItem1 = document.createElement('li')
projectsItem1.innerText = 'Dar consejos'
var projectsItem2 = document.createElement('li')
projectsItem2.innerText = 'Llevar paraguas'

projectsList.appendChild(projectsItem1)
projectsList.appendChild(projectsItem2)

document.body.appendChild(projectsTitle)
document.body.appendChild(projectsList)


// TODO continue and end CV ( experience, Projects..)