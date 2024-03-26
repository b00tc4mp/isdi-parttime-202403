var headTitle = document.querySelector('title')
headTitle.innerText = "CV - Carla Mateo"

var title = document.createElement("h1")
title.innerText = headTitle.innerText

document.body.appendChild(title)

var introTitle = document.createElement('h2')
introTitle.innerText = 'Intro'

document.body.appendChild(introTitle)

var introDescription = document.createElement('p')
introDescription.innerText = ''

document.body.appendChild