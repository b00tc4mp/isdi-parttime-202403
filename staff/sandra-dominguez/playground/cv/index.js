var head = document.head

var fontLink = document.createElement('link')
fontLink.href = 'https://fonts.googleapis.com/css2?family=Caveat:wght@400..700&display=swap'
fontLink.rel = 'stylesheet'
document.head.appendChild(fontLink)

var style = document.createElement('style')
style.innerHTML = 'body {position: fixet; font-family: Caveat; color: #BB8FCE; margin: 50px; padding: 15px; border-style: groove; border-radius: 8px; word-spacing: 5px; font-size: 20px;box-shadow: 0px 4px 5px black; background-image: url(https://img.freepik.com/vector-gratis/fondo-onda-blanca-suave_52683-55288.jpg?size=626&ext=jpg&ga=GA1.1.539837299.1711756800&semt=sph); background-repeat: no-repeat; background-size: cover; }'
head.appendChild(style)

var body = document.body

var headTitle = document.querySelector('title')
headTitle.innerText = 'CV - Sandra DS'

var title = document.createElement('h1')
title.innerText = headTitle.innerText

document.body.appendChild(title)

var introTitle = document.createElement('h2')
introTitle.innerText = 'Intro'

document.body.appendChild(introTitle)

var introDescription = document.createElement('p')
introDescription.innerText = 'Soy aficionada a la montaña, me gusta hacer rutas y descubrir sitios nuevos en plena naturaleza ^^'

document.body.appendChild(introDescription)

var certificationsTitle = document.createElement('h2')
certificationsTitle.innerText = 'Certifications'
certificationsTitle.style.textDecoration = 'underline'

document.body.appendChild(certificationsTitle)

var certificationsList = document.createElement('ul')

var certificationsTitles = ['Scrum Master', 'Full Stack development (ISDI Coders)']

for (var i = 0; i < certificationsTitles.length; i++) {
    var certificationTitle = certificationsTitles[i]

    var certificationItem = document.createElement('li')
    certificationItem.innerText = certificationTitle

    certificationsList.appendChild(certificationItem)
}

document.body.appendChild(certificationsList)

var experiencesTitle = document.createElement('h2')
experiencesTitle.innerText = 'Experience'
experiencesTitle.style.textDecoration = 'underline'

document.body.appendChild(experiencesTitle)

var experienceList = document.createElement('ul')

var experiencesTitles = ['FreeCodeCamp', 'ISDI Coders', 'Udemy']

for (var i = 0; i < experiencesTitles.length; i++) {
var experienceTitle = experiencesTitles[i]

var experienceItem = document.createElement('li')
experienceItem.innerText = experienceTitle

experienceList.appendChild(experienceItem)
}

document.body.appendChild(experienceList)

var projectTitle = document.createElement('h2')
projectTitle.innerText = 'Projecto'
projectTitle.style.textDecoration = 'underline'

document.body.appendChild(projectTitle)

var projectDescription = document.createElement('p')
projectDescription.innerText = 'Mejorar mis habilidades como desarrollador, aprender todo lo que pueda y sorprenderme con lo que pueda crear.'

document.body.appendChild(projectDescription)