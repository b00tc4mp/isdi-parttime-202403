// Puede agreviarse :  var body = document.querySelector('body')
// otra manera de abreviarse : var body = document.body (se eligira esta)
var body = document.body
body.style.backgroundColor = 'black'
 
var headTitle = document.querySelector('title')
headTitle.innerText = 'CV - Jason'

var title = document.createElement('h1')
title.innerText = headTitle.innerText

body.appendChild(title)
//
var intro =  document.createElement('h2')
intro.innerText = 'Intro'

body.appendChild(intro)
//
var introDescription = document.createElement ('p')
introDescription.innerText = 'Profesional Developer - "ISDI CODERS". Altamente con sentido etico y profesional con conocimientos en Front-end y Back-end'
body.appendChild(introDescription)
//
var certificationsTitle = document.createElement('h2')
certificationsTitle.innerText = 'Certifications'
body.appendChild(certificationsTitle) 
//
var certificationsList = document.createElement('ul')
var certificationItem1 = document.createElement('li')
certificationItem1.innerText = "Scrum Master"
certificationsList.appendChild(certificationItem1)
body.appendChild(certificationsList)
//
var certificationItem2 = document.createElement('li')
certificationItem2.innerText = 'Full stack Development (ISDI CODERS)'
certificationsList.appendChild(certificationItem2)
body.appendChild(certificationsList)
//
var certificationItem3 = document.createElement('li')
certificationItem3.innerText = 'ISDI CODERS - DEVELOPER'
certificationsList.appendChild(certificationItem3)
body.appendChild(certificationsList)

// EXPERIENCE 

var experienceTitle = document.createElement('h2')
experienceTitle.innerText = 'Experience'
body.appendChild(experienceTitle)
//
var experienceList = document.createElement('ul')
var experienceItem1 = document.createElement('li')
experienceItem1.innerText = 'SIEMENS'
experienceList.appendChild(experienceItem1)
body.appendChild(experienceList)
//
var experienceItem2 = document.createElement('li')
experienceItem2.innerText= 'ABB'
experienceList.appendChild(experienceItem2)
body.appendChild(experienceList)

