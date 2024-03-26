var headTitle = document.querySelector("title")

headTitle.innerText = "Cv - Campa Nilla"

var title = document.createElementNS("h1")
title.innerText = headTitle.innerText

document.body.appendChild(title)

var intro = document.createElement("h2")
intro.innerText = "Intro"

document.body.appendChild(intro)

var introDescription = document.createElement("p")
introDescription.innerText = "Soy aficionado a la tecla desde que tengo uso de razón... blah blah blah"

var certificationsTitle = document.createElement("h2")
certificationsTitle.innerText = "Certifications"

document.body.appendChild(certificationsTitle)

var certificationsLists = document.createElement("ul")

var certificationItem1 = document.createElement("li")
certificationItem1.innerText = "Scrum Master"

certificationsLists.appendChild(certificationItem1)
document.body.appendChild(certificationsLists)