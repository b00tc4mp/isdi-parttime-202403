var headTitle = document.querySelector('title')
headTitle.innerText = 'CV - Jason'

var title = document.createElement('h1')
title.innerText = headTitle.innerText

document.body.appendChild(title)
//
var intro =  document.createElement('h2')
intro.innerText = 'Intro'

document.body.appendChild(intro)
//
var introDescription = document.createElement ('p')
introDescription.innerText = 'Profesional Developer - "ISDI CODERS". Altamente con sentido etico y profesional con conocimientos en Front-end y Back-end'
document.body.appendChild(introDescription)
//
var certificationsTitle = document.createElement('h2')
certificationsTitle.innerText = 'Certifications'
document.body.appendChild(certificationsTitle) 
//
var certificationsList = document.createElement('ul')
var certificationItem1 = document.createElement('li')
certificationItem1.innerText = "Scrum Master"
certificationsList.appendChild(certificationItem1)
document.body.appendChild(certificationsList)
//
var certificationItem2 = document.createElement('li')
certificationItem2.innerText = 'Full stack Development (ISDI CODERS)'
certificationsList.appendChild(certificationItem2)
document.body.appendChild(certificationsList)
//
var certificationItem3 = document.createElement('li')
certificationItem3.innerText = 'ISDI CODERS - DEVELOPER'
certificationsList.appendChild(certificationItem3)
document.body.appendChild(certificationsList)
//
var experienceTitle = document.createElement('h2')
experienceTitle.innerText = 'Experience'
document.body.appendChild(experienceTitle)
//
var experienceList = document.createElement('ul')
var experienceItem1 = document.createElement('li')
experienceItem1.innerText = 'SIEMENS'
experienceList.appendChild(experienceItem1)
document.body.appendChild(experienceList)
//
var experienceItem2 = document.createElement('li')
experienceItem2.innerText= 'ABB'
experienceList.appendChild(experienceItem2)
document.body.appendChild(experienceList)

