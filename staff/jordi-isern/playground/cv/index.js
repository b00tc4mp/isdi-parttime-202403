

var headTitle = document.querySelector("title")
headTitle.innerText = 'CV - Pepito Grillo'

var title = document.createElement('h1')
title.innerHTML = headTitle.innerText

document.body.appendChild(title)

var introTitle = document.createElement('h2')

introTitle.innerText = 'Intro'

document.body.appendChild(introTitle)

var introParagraph = document.createElement('p')

introParagraph.innerText = 'Soy aficionado a la tecla desde que tengo uso de razon... bla bla bla'

document.body.appendChild(introParagraph)

var certificationsTitle = document.createElement('h2')

certificationsTitle.innerText = 'certifications'

document.body.appendChild(certificationsTitle)

var certificationsList = document.createElement('ul')

var certificationItem1 = document.createElement('li')
certificationItem1.innerText = ' Scrum Master'

certificationsList.appendChild(certificationItem1)

document.body.appendChild(certificationsList)

var certificationItem2 = document.createElement('li')
certificationItem2.innerText = 'Full stack Developer (ISDI Coders)'

certificationsList.appendChild(certificationItem2)

var experienceTitle = document.createElement('h2')

experienceTitle.innerText = 'Experience'

document.body.appendChild(experienceTitle)

var experienceList = document.createElement('ul')

var experienceItem1 = document.createElement('li')

experienceItem1.innerText = 'three years as Freelance in web develop for busines'

experienceList.appendChild(experienceItem1)

document.body.appendChild(experienceList)

var experienceItem2 = document.createElement('li')

experienceItem2.innerText = 'software Architech (microsorft, 2020)'

experienceList.appendChild(experienceItem2)

document.body.appendChild(experienceList)

var buttonGithub = document.createElement("button")

buttonGithub.innerText = "visit my github"

document.body.appendChild(buttonGithub)

buttonGithub.onclick = function() {
    window.open('https://github.com/jordi1094?tab=repositories', '_blank');
};
