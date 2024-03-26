var headTitle = document.querySelector('title')

headTitle.innerText = 'CV - Pepito Grillo'


var title = document.createElement('h1')
title.innerText = headTitle.innerText

document.body.appendChild(title)

var image = document.createElement('img')
image.src = 'https://www.ferrerferran.com/wp-content/uploads/pepito.jpg'
image.alt = "pepito con paraguas"
document.body.appendChild(image)

var title = document.createElement('h2')
title.innerText = 'Intro'

document.body.appendChild(title)


var introDescription = document.createElement('p')
introDescription.innerText = "Soy Pepito Grillo y doy consejos a Pinocho, a veces valen y otras tampoco. Super pepito"

document.body.appendChild(introDescription)

var certificationsTitle = document.createElement('h2')
certificationsTitle.innerText = "Certificaciones"
document.body.appendChild(certificationsTitle)

var certificationList = document.createElement('ul')
certificationList.id = 'contenido'

var certificationItem1 = document.createElement('li')
certificationItem1.innerText = 'Scrum Master'
var certificationItem2 = document.createElement('li')
certificationItem2.innerText = 'Master Of Universe'
var certificationItem3 = document.createElement('li')
certificationItem3.innerText = 'JavaScript'

certificationList.appendChild(certificationItem1)
certificationList.appendChild(certificationItem2)
certificationList.appendChild(certificationItem3)

document.body.appendChild(certificationList)

var experienceTitle = document.createElement('h2')
experienceTitle.innerText = 'Experiencia anterior'
var experecienceP = document.createElement('p')
experecienceP.innerText = 'Me pasé mucho años dando consejos a Pinocho, después me metí en el mundo IT'

document.body.appendChild(experienceTitle)
document.body.appendChild(experecienceP)

var projectsTitle = document.createElement('h2')
projectsTitle.innerText = 'ISDI_Coders'
var projectsList = document.createElement('ul')
var projectsItem1 = document.createElement('li')
projectsItem1.innerText = 'Dar consejos'
var projectsItem2 = document.createElement('li')
projectsItem2.innerText = 'Llevar paraguas'

projectsList.appendChild(projectsItem1)
projectsList.appendChild(projectsItem2)

document.body.appendChild(projectsTitle)
document.body.appendChild(projectsList)


var experienceTitle2 = document.createElement('h3')
experienceTitle2.innerText = 'Más experiencia'

 var experienceList = document.createElement('ul')
 var experienceItem1 = document.createElement('li')
 experienceItem1.innerText = 'Sowtware Architect '
 var experienceItem2 = document.createElement('li')
experienceItem2.innerText = "Twitter"


 experienceList.appendChild(experienceItem1)
 experienceList.appendChild(experienceItem2)

 document.body.appendChild(experienceTitle2)
 document.body.appendChild(experienceList)


 var button = document.createElement('button')
button.innerText = 'BOTóN'
document.body.appendChild(button)