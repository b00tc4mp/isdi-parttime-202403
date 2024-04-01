
//add titulo a la pagina
var headTitle = document.querySelector('title')
headTitle.innerText = "CV - Carla Mateo"

//add titulo al documento

var title = document.createElement("h1")
title.innerText = headTitle.innerText

document.body.appendChild(title)

//add h2

var introTitle = document.createElement('h2')
introTitle.innerText = 'About me'

document.body.appendChild(introTitle)

//add boton sale por consola

var buttons = document.createElement("Button")

function hello(){
    console.log("Hola!")
}

buttons.onclick = hello

buttons.innerText = "Botón"
document.body.appendChild(buttons)

//add texto descriptivo

var introDescription = document.createElement('p')
introDescription.innerText = "Soy developed desde hace dos años.... soy una persona que le gusta trabajar en equipo...etc"

document.body.appendChild(introDescription)

//add un titulo de una lista 

var certificationsTitle = document.createElement("h2")
certificationsTitle.innerText = "Certifications"

document.body.appendChild(certificationsTitle)

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

document.body.appendChild(certificationsList)

//add lista con arr y bucle for

var experience = ["Web developed at Google", "Sofware engineer at Instagram" ]

var experienceTitle = document.createElement("h2")
experienceTitle.innerText = "Experience"

document.body.appendChild(experienceTitle)

var experienceList = document.createElement("ul")
document.body.appendChild(experienceList)

for (var i = 0; i < experience.length; i++){
    var experienceItem = document.createElement("li");
    experienceItem.innerText = experience[i];
    experienceList.appendChild(experienceItem);
}
















































