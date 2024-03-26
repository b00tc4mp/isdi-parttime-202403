var headTitle = document.querySelector('title')
headTitle.innerText = "CV - Carla Mateo"

var title = document.createElement("h1")
title.innerText = headTitle.innerText

document.body.appendChild(title)

var introTitle = document.createElement('h2')
introTitle.innerText = 'Intro'

document.body.appendChild(introTitle)

var button = document.createElement("Button")

function hello(){
    console.log("Hola!")
}

button.onclick = hello

button.innerText = "Boton"
document.body.appendChild(button)

var introDescription = document.createElement('p')
introDescription.innerText = 'Soy aficionada a trastear en los ordenadores desde pequeña, siempre me ha gustado la idea de ganarme la vida a traves de uno'

document.body.appendChild(introDescription)

var certificationsTitle = document.createElement("h2")
certificationsTitle.innerText = "Certifications"

document.body.appendChild(certificationsTitle)

var certificationsList = document.createElement("ul")

var certificationItem1 = document.createElement("li")
certificationItem1.innerText = "Master&Comanders"

certificationsList.appendChild(certificationItem1)

var certificationItem2 = document.createElement('li')
certificationItem2.innerText = 'Full Stack Development (ISDI Coders)'

certificationsList.appendChild(certificationItem2)

document.body.appendChild(certificationsList)

var experienceTitle = document.createElement('h2')
experienceTitle.innerText = 'Experience'

document.body.appendChild(experienceTitle)

var projectTitle = document.createElement('h2')
projectTitle.innerText = 'Projects'

document.body.appendChild(projectTitle)