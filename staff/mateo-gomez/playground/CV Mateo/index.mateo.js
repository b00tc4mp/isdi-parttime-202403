/*var font = document.createElement("link")
fontLink.href = 'https://fonts.googleapis.com/css2?family=Tauri&display=swap'
fontLink.rel = "StyleSheet"
document.head.appendChild(fontLink)*/

/*var style = document.createElement("style")
style.innerHTML = "body {background-color: greenyellow}"
headTitle.appendChild(style)*/

var body = document.body
body.style.backgroundColor = "greenyellow"
body.style.fontFamily = "Tauri"
body.style.margin = "5vw"
body.style.padding = "15px"


var headTitle = document.querySelector("title")

headTitle.innerText = "CV Mateo Gómez-Lucía"

var title = document.createElement("h1")
title.innerText = headTitle.innerText

document.body.appendChild(title)

var contactTitle = document.createElement("section")
contactTitle.innerText = "Contacto"
document.body.appendChild(contactTitle)
contactTitle.style.textDecoration ="underline double darkgreen"

var telephoneNum = document.createElement("section")
telephoneNum.innerText = "Teléfono: +34 618845245"
document.body.appendChild(telephoneNum)

var email = document.createElement("section")
email.innerText = "email: gomezmateo626@gmail.com"
document.body.appendChild(email)

var intro = document.createElement("h2")
intro.innerText = "Intro"

document.body.appendChild(intro)

var introDescription = document.createElement("p")
introDescription.innerText = "Me llamo Mateo y me encanta el deporte y la música. Me gustaría aprender mucho en el curso de Desarrollo Web que estoy haciendo para poder ser un gran desarrollador en el futuro y poder encontrar un trabajo que me guste."

document.body.appendChild(introDescription)

var certificationsTitle = document.createElement("h2")
certificationsTitle.innerText = "Certificados"
document.body.appendChild(certificationsTitle)

var certificationList = document.createElement("ul")

var certificationLanguageTitle = document.createElement("h4")
certificationLanguageTitle.innerText = "Idiomas"
document.body.appendChild(certificationLanguageTitle)

var certificationLanguage = document.createElement("li")
certificationLanguage.innerText = "Certificado de Francés C1"

var certificationLanguage2 = document.createElement("li")
certificationLanguage2.innerText = "Certificado de Inglés B2"

certificationList.appendChild(certificationLanguage)
certificationList.appendChild(certificationLanguage2)
document.body.appendChild(certificationList)

//var certificationListPrograms = document.createElement("ul")
//document.body.appendChild(certificationListPrograms)

var certificationProgramTitle = document.createElement("h4")
certificationProgramTitle.innerText = "Programas"
document.body.appendChild(certificationProgramTitle)

var certificationPrograms1 = document.createElement("li")
certificationPrograms1.innerText = "Certificado Google Analytics"
document.body.appendChild(certificationPrograms1)

var certificationPrograms2 = document.createElement("li")
certificationPrograms2.innerText = "Certificado Google Ads"
document.body.appendChild(certificationPrograms2)


var studiesTitle = document.createElement("h2")
studiesTitle.innerText = "Estudios"
document.body.appendChild(studiesTitle)
studiesTitle.style.alignItems

var studiesList = document.createElement("ol")
document.body.appendChild(studiesList)

var studiesItem1 = document.createElement("li")
studiesItem1.innerText = "Máster en Marketing Digital 21/23"
document.body.appendChild(studiesItem1)

var studiesItem2 = document.createElement("li")
studiesItem2.innerText = "Grado en Publicidad y Relaciones Públicas 16/21"
document.body.appendChild(studiesItem2)

var studiesItem3 = document.createElement("li")
studiesItem3.innerText = "Comunication et information à l'Université de Strasbourg 18/19"
document.body.appendChild(studiesItem3)

var studiesItem4 = document.createElement("li")
studiesItem4.innerText = "Grado en Ciencias Políticas 15/16"
document.body.appendChild(studiesItem4)


var experienceTitle = document.createElement("h2")
experiencesTitle.innerText = "Experiencia"
document.body.appendChild(experiencesTitle)



var experiencesList = document.createElement("ul")
document.body.appendChild(experiencesList)

var experiencesTitles = ["Becario Marketing Digital (Comunicare, 2023)", "Repartidor de Publicidad (Punto a punto Logística, 2017-2023)"
, "Heladero (/'Heladería La IBENSE /', 2023)"
]

for (var i= 0; i< experiencesTitles.length; i++){
    var experienceTitle = experiencesTitles[i]

    var experienceItem = document.createElement("li")
    experienceItem.innerText = experienceTitle

    certificationList.appendChild(experienceItem)
}

var experienceItem1 = document.createElement("li")
experienceItem1.innerText = "Becario Marketing Digital (Comunicare, 2023)"

experiencesList.appendChild(experienceItem1)

var experienceItem2 = document.createElement("li")
experienceItem2.innerText = "Repartidor de Publicidad (Punto a punto Logística, 2017-2023)"

experiencesList.appendChild(experienceItem2)

var experienceItem3 = document.createElement("li")
experienceItem3.innerText = "Heladero (/'Heladería La IBENSE /', 2023)"

document.body.appendChild(experienceItem3)


