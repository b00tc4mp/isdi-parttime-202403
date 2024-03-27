var headTitle = document.querySelector(`title`)
headTitle.innerText = `CV - Leide Vanessa Cardoso`

var title = document.createElement(`h1`)
title.innerText = headTitle.innerText

document.body.appendChild(title)

 var introTitle = document.createElement(`h2`)
 introTitle.innerText = `Intro`

 document.body.appendChild(introTitle)

 var introDescription = document.createElement(`p`)
 introDescription.innerText = `Difficulty is just a skill to be developed!`

 document.body.appendChild(introDescription)

var certificationsTitles = document.createElement(`h2`)
certificationsTitles.innerText = `Certifications`

document.body.appendChild(certificationsTitles)

var certificationsList = document.createElement(`ul`)

var certificationsItem1 = document.createElement(`li`)
certificationsItem1.innerText = `Business`

certificationsList.appendChild(certificationsItem1)

document.body.appendChild(certificationsList)

var certificationsItem2 = document.createElement(`li`)
certificationsItem2.innerText = `Marketing`

certificationsList.appendChild(certificationsItem2)

document.body.appendChild(certificationsList)


var experienceTitle = document.createElement(`h2`)
experienceTitle.innerText = `Experience`

document.body.appendChild(experienceTitle)




