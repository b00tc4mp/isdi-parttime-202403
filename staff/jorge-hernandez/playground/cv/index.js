var headTitle = document.querySelector("title")
headTitle.innerText = "CV - Pepito Grillo"

var title = document.createElement("h1")
title.innerText = headTitle.innerText
document.body.appendChild(title)

var introTitle = document.createElement("h2")
introTitle.innerText = "Intro"
document.body.appendChild(introTitle)

var introDescription = document.createElement("p")    
introDescription.innerText = "Soy aficionado a la tecla desde que tengo uso de razón"
document.body.appendChild(introDescription)

var certificationsTitle = document.createElement("h2")
certificationsTitle.innerText = "Certifications:"
document.body.appendChild(certificationsTitle)

var certificationsList = document.createElement("ul")
document.body.appendChild(certificationsList)

var certificationsItem1 = document.createElement("li")
certificationsItem1.innerText = "Scrum Master"
certificationsList.appendChild(certificationsItem1)

var certificationsItem2 = document.createElement("li")
certificationsItem2.innerText = "Full Stack Developer"
certificationsList.appendChild(certificationsItem2)

var experienceTitle = document.createElement("h2")
experienceTitle.innerText = "Experience:"
document.body.appendChild(experienceTitle)

var experienceList = document.createElement("ul")
document.body.appendChild(experienceList)

var experienceItem1 = document.createElement("li")
experienceItem1.innerText = "2003 - 2014 Pullmantur Cruises"
experienceList.appendChild(experienceItem1)

var experienceItem2 = document.createElement("li")
experienceItem2.innerText = "2014 -2021 Balearia"
experienceList.appendChild(experienceItem2)

