var headTitle = document.querySelector(`title`)
headTitle.innerText = `CV - Leide Vanessa Cardoso`

var title = document.createElement(`h1`)
title.innerText = headTitle.innerText

document.body.appendChild(title)

 var introTitle = document.createElement(`h2`)
 introTitle.innerText = `Profile`

 document.body.appendChild(introTitle)

 var introDescription = document.createElement(`p`)
 introDescription.innerText = `I am proactively dynamic in search of professional development and growth.`

 document.body.appendChild(introDescription)

var certificationsTitles = document.createElement(`h2`)
certificationsTitles.innerText = `Certifications`

document.body.appendChild(certificationsTitles)

var certificationsList = document.createElement(`ul`)

var certificationsItem1 = document.createElement(`li`)
certificationsItem1.innerText = `Bachelor in International Business`

certificationsList.appendChild(certificationsItem1)

document.body.appendChild(certificationsList)

var certificationsItem2 = document.createElement(`li`)
certificationsItem2.innerText = `Marketing to Sales`

certificationsList.appendChild(certificationsItem2)

document.body.appendChild(certificationsList)

var experienceTitle = document.createElement(`h2`)
experienceTitle.innerText = `Experience`

document.body.appendChild(experienceTitle)

var experienceList = document.createElement(`ul`)

var experienceItem1 = document.createElement(`li`)
experienceItem1.innerText = `INCAST: Influencer Marketing, Jun/2020 - Jan/2021` 

experienceList.appendChild(experienceItem1)

document.body.appendChild(experienceList)


var experience1 = document.createElement(`experience1`)
experience1.innerText = `Operational work, selecting influencers and coordinating content by influencers for the dissemination of advertising campaigns for brands and apps around the world through social networks Facebook, Twiter, TiktTok, Instagram, among others, throughout the campaign.`

document.body.appendChild(experience1)


var experienceList2 = document.createElement(`ul`)

var experienceItem2 = document.createElement(`li`)
experienceItem2.innerText = `CNA School: Director, Oct/2014 – Jul/2018`

experienceList2.appendChild(experienceItem2)

document.body.appendChild(experienceList2)

var experience2 = document.createElement(`experience2`)
experience2.innerText = `Management of the commercial, secretarial and cleaning team, transmitting through reports or in person the facts that occurred in the work environment to the management.`

document.body.appendChild(experience2)
