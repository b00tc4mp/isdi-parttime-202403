var headTitle = document.querySelector('title')
headTitle.innerText = 'CV - Adrian Martin Gonzalo'

var title = document.createElement('h1')
title.innerText = headTitle.innerText

document.body.appendChild(title)


var introTitle = document.createElement('h2')
introTitle.innerText = 'Intro'

document.body.appendChild(introTitle)


var introDescription = document.createElement('p')
introDescription.innerText = 'Nose que poner, pero me servira como ejemplo'

document.body.appendChild(introDescription)


var certificationTitle = document.createElement('h2')
certificationTitle.innerText = 'certification'

document.body.appendChild(certificationTitle)


var certificationList = document.createElement('ul')

var certificationitem2 = document.createElement('li')
certificationitem2.innerText = 'Educación Secundaria Obligatoria'

certificationList.appendChild(certificationitem2)

var certificationitem2 = document.createElement('li')
certificationitem2.innerText = 'Preimpresión Digital'

certificationList.appendChild(certificationitem2)

document.body.appendChild(certificationList)

var experienceTitle = document.createElement('h2')
experienceTitle.innerText = 'Experience'

document.body.appendChild(experienceTitle)

var experienceList = document.createElement('ul')

var experienceItem = document.createElement('li')
experienceItem.innerText = 'ESO 2015-2020'

experienceList.appendChild(experienceItem)

document.body.appendChild(experienceItem)

var experienceItem2 = document.createElement('li')
experienceItem2.innerText = 'Preimpresion Digital 2020-2022'

experienceList.appendChild(experienceItem2)

document.body.appendChild(experienceItem2)