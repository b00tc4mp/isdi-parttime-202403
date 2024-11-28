
//para acortar
var body = document.body



var fontLink = document.createElement("link")
fontLink.href = 'https://fonts.googleapis.com/css2?family=Reddit+Mono:wght@200..900&family=Roboto:ital,wght@0,100;0,300;0,400;0,500;0,700;0,900;1,100;1,300;1,400;1,500;1,700;1,900&display=swap'
fontLink.rel = "stylesheet"
document.head.appendChild(fontLink)

//cambiar color fondo, color letras y fuente de la letra  con js
body.style.backgroundColor ="rgba(255, 255, 128, .5)"
body.style.margin = "50px"
body.style.fontFamily = 'Reddit mono'
body.style.color = 'violet'


//add titulo a la pagina
var headTitle = document.querySelector('title')
headTitle.innerText = "CV - Carla Mateo"

//add titulo al documento

var title = document.createElement("h1")
title.innerText = headTitle.innerText

body.appendChild(title)

//add h2

var introTitle = document.createElement('h2')
introTitle.innerText = 'About me'
introTitle.style.textDecoration = "underline"

body.appendChild(introTitle)

//add boton sale por consola

var buttons = document.createElement("Button")

function hello(){
    console.log("Hola!")
}

buttons.onclick = hello

buttons.innerText = "Botón"
body.appendChild(buttons)

//add texto descriptivo

var introDescription = document.createElement('p')
introDescription.innerText = "Soy developed desde hace dos años.... soy una persona que le gusta trabajar en equipo...etc"

document.body.appendChild(introDescription)

//add un titulo de una lista 

var certificationsTitle = document.createElement("h2")
certificationsTitle.innerText = "Certifications"
//add underline 
// certificationsTitle.classList.add('lineaCertifications)'
certificationsTitle.style.textDecoration = 'underline'

body.appendChild(certificationsTitle)

//add una lista con "ul" an "li"

var certificationsList = document.createElement("ul")

var certificationItem1 = document.createElement("li")
certificationItem1.innerText = "Certification Freecodecamp"

certificationsList.appendChild(certificationItem1)

var certificationItem2 = document.createElement('li')
certificationItem2.innerText = 'Full Stack Development (ISDI Coders)'

certificationsList.appendChild(certificationItem2)

var certificationItem3 = document.createElement("li")
certificationItem3.innerText = "Scrum Master"

certificationsList.appendChild(certificationItem3)

body.appendChild(certificationsList)


//add lista con arr y bucle for

var experienceTitle = document.createElement('h2')
experienceTitle.innerText = 'Experience'
//add para subrallar
experienceTitle.style.textDecoration = 'underline'
// experienceTitle.classList.add('underline')
body.appendChild(experienceTitle)

var experiencesList = document.createElement('ul')

var experience = ['Software Architect (Microsoft, 2020)', 'Software Engineer (Facebook, 2015)', 'Software Developer (Twitter, 2008)']

for (var i = 0; i < experience.length; i++) {
    var experienceTitle = experience[i]

    var experienceItem = document.createElement('li')
    experienceItem.innerText = experienceTitle

    experiencesList.appendChild(experienceItem)
}

body.appendChild(experiencesList)
















































