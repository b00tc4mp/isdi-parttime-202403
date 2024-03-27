var head = document.head

var fontLink = document.createElement('link')
fontLink.href = 'https://fonts.googleapis.com/css2?family=Workbench&display=swap'
fontLink.rel = 'stylesheet'
head.appendChild(fontLink)

var style = document.createElement('style')
style.innerHTML = 'body { background-color: black; margin: 5vw; font-family: Workbench; color: greenyellow; }'
head.appendChild(style)

// var body = document.querySelector('body')
var body = document.body
// body.style.backgroundColor = 'black'
// body.style.margin = '5vw'
// body.style.fontFamily = 'Workbench'
// body.style.color = 'greenyellow'

var headTitle = document.querySelector('title')
headTitle.innerText = 'CV - Pepito Grillo'

var title = document.createElement('h1')
title.innerText = headTitle.innerText

body.appendChild(title)

var introTitle = document.createElement('h2')
introTitle.innerText = 'Intro'

body.appendChild(introTitle)

var introDescription = document.createElement('p')
introDescription.innerText = 'Soy aficionado a la tecla desde que tengo uso de razon... blah blah blah'

body.appendChild(introDescription)

var certificationsTitle = document.createElement('h2')
certificationsTitle.innerText = 'Certifications'
// certificationsTitle.classList.add('underline')
certificationsTitle.style.textDecoration = 'underline overline double'

body.appendChild(certificationsTitle)

var certificationsList = document.createElement('ul')

var certificationsTitles = ['Blockchain Development', 'Scrum Master', 'Full Stack Development (ISDI Coders)']

for (var i = 0; i < certificationsTitles.length; i++) {
    var certificationTitle = certificationsTitles[i]

    var certificationItem = document.createElement('li')
    certificationItem.innerText = certificationTitle

    certificationsList.appendChild(certificationItem)
}

body.appendChild(certificationsList)

var experienceTitle = document.createElement('h2')
experienceTitle.innerText = 'Experience'
// experienceTitle.classList.add('underline')
experienceTitle.style.textDecoration = 'underline'

body.appendChild(experienceTitle)

var experiencesList = document.createElement('ul')

var experiencesTitles = ['Software Architect (Microsoft, 2020)', 'Software Engineer (Facebook, 2015)', 'Software Developer (Twitter, 2008)']

for (var i = 0; i < experiencesTitles.length; i++) {
    var experienceTitle = experiencesTitles[i]

    var experienceItem = document.createElement('li')
    experienceItem.innerText = experienceTitle

    experiencesList.appendChild(experienceItem)
}

body.appendChild(experiencesList)
