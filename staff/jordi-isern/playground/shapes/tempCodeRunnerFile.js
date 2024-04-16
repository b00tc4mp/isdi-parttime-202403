var headTitle = document.querySelector("title")
headTitle.innerText = 'CV - Pepito Grillo'

var title = document.createElement('h1')
title.innerHTML = headTitle.innerText

document.body.appendChild(title)

var introTitle = document.createElement('h2')

introTitle.innerText = 'Intro'

document.body.appendChild(introTitle)