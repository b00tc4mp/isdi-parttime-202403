var headTitle = document.querySelector('title')
headTitle.innerText = 'CV - Monkey D. Luffy'
var title = document.createElement('h1')
title.innerText = headTitle.innerText
document.body.appendChild(title)
var introTitle =document.createElement('h2')
introTitle.innerText = 'Monkey D. Luffy, más conocido como Luffy «Sombrero de Paja»'
document.body.appendChild(introTitle)
var introParagraph = document.createElement('p')
introParagraph.innerText = 'Es el capitán y fundador de los Piratas de Sombrero de Paja.'
document.body.appendChild(introParagraph)

var skillsTitle = document.createElement('h2')
skillsTitle.innerText = 'Habilidades'
document.body.appendChild(skillsTitle)

var skillsList = document.createElement('ul')
var skillsitem1 = document.createElement('li')
var skillsitem2 = document.createElement('li')
var skillsitem3 = document.createElement('li')
var skillsitem4 = document.createElement('li')

skillsitem1.innerText = 'Su cuerpo tiene la propiedad de la goma, se estira, rebota, dobla e infla cualquier parte de su cuerpo.'
skillsList.appendChild(skillsitem1)
document.body.appendChild(skillsList)

skillsitem2.innerText = 'Maestro especialista de la lucha cuerpo a cuerpo y las artes marciales'
skillsList.appendChild(skillsitem2)
document.body.appendChild(skillsList)

skillsitem3.innerText = 'Posee una tremenda velocidad, agilidad y reflejos'
skillsList.appendChild(skillsitem3)
document.body.appendChild(skillsList)

skillsitem4.innerText = 'Mientras está completamente dormido, come como si estuviera despierto'
skillsList.appendChild(skillsitem4)
document.body.appendChild(skillsList)