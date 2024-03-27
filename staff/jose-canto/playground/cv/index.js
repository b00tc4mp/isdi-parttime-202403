
//Titulo
var headTitle = document.querySelector('title')
headTitle.innerText = 'CV - Pepito Grillo'

var title = document.createElement('h1')
title.innerText = headTitle.innerText

document.body.appendChild(title)

var introTitle = document.createElement('h2')
introTitle.innerText = "Title"

//Intro Titulo
document.body.appendChild(introTitle)

var introDescription = document.createElement('p')
introDescription.innerText = "Soy aficionado a la tecla desde que tengo uso de razón... blah blah blah"

document.body.appendChild(introDescription)

// Certificacines

var certificationsTitle = document.createElement('h2')
certificationsTitle.innerText = 'Certifications'

document.body.appendChild(certificationsTitle)

var certificationsList = document.createElement('ul')

var certificationItem1 = document.createElement('li')
certificationItem1.innerText = 'Scrum Master'

certificationsList.appendChild(certificationItem1)

var certificationItem2 = document.createElement('li')
certificationItem2.innerText = "Full Stack Developer (ISDI Coders)"

certificationsList.appendChild(certificationItem2)


var certificationItem3 = document.createElement('li')
certificationItem3.innerText = "Certification Freecodecamp"

certificationsList.appendChild(certificationItem3)

document.body.appendChild(certificationsList)

// Experiencia

var experienceTitle = document.createElement('h2')
experienceTitle.innerText = 'Experience'
document.body.appendChild(experienceTitle)

var experienceList = document.createElement('ul')

var experienceOne = document.createElement('li')
experienceOne.innerText = 'Software Engineer at Google (2010-2012)'

experienceList.appendChild(experienceOne)


var experienceTwo = document.createElement('li')
experienceTwo.innerText = 'Software Engineer at Amazon (2013-2015)'

experienceList.appendChild(experienceTwo)

document.body.appendChild(experienceList)

var experienceThree = document.createElement('li')
experienceThree.innerText = 'Software Developr at Twitter (2015-2020)'

experienceList.appendChild(experienceThree)

document.body.appendChild(experienceList)



// Botón
var button = document.createElement("button")
button.innerText = "Click me!"

document.body.appendChild(button)

// Imagen
var img = document.createElement("img")
img.src = "https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885__480.jpg"


var divContainerImg = document.createElement('div')
divContainerImg.appendChild(img)

document.body.appendChild(divContainerImg)



// Link
var urlLink = document.createElement('a');
urlLink.innerText = 'Notion Bootcamp ISDI Coders';
urlLink.href = 'https://frill-scorpio-cd1.notion.site/BOOTCAMP-ISDICODERS-c92377c6fcc64696bd6ff37508770e14?pvs=4';

// Div
var divContainer = document.createElement('div');
divContainer.appendChild(urlLink);

// Añadir el div al body del documento
document.body.appendChild(divContainer);


//Footer

var footer = document.createElement('footer')
footer.innerHTML = 'Made with ❤️ by Jose A.Canto'

document.body.appendChild(footer)

