var head = document.head

var fontLink = document.createElement('link')
fontLink.href = 'https://fonts.googleapis.com/css2?family=Workbench&display=swap'
fontLink.rel = 'stylesheet'
head.appendChild(fontLink);

var style = document.createElement('style')
style.innerHTML = 'body { background-color: black; margin: 5vw; font-family: Workbench; color: greenyellow; }'
head.appendChild(style)

var headTitle = document.querySelector('title')
headTitle.innerText = 'CV - Agustin Birman'

var title = document.createElement('h1')
title.innerText = 'Agustin Birman'

document.body.appendChild(title)

var introTitle = document.createElement('h2')
introTitle.innerText = 'Intro'

document.body.appendChild(introTitle)

var introDescription = document.createElement('p')
introDescription.innerText = 'I really like programming'

document.body.appendChild(introDescription)

var personalInfo = document.createElement('h2')
personalInfo.innerText = 'Personal Information'

document.body.appendChild(personalInfo)

var personalInfoList = document.createElement('ul')
document.body.appendChild(personalInfoList)

var personalInfoItem1 = document.createElement('li')
personalInfoItem1.innerText = 'Full Name: Agustin Hernan Birman Pereyra' 

personalInfoList.appendChild(personalInfoItem1)

var personalInfoItem2 = document.createElement('li')
personalInfoItem2.innerText = 'Address: Fake Address 123'

personalInfoList.appendChild(personalInfoItem2)

var personalInfoItem3 = document.createElement('li')
personalInfoItem3.innerText = 'Phone: 123456789'

personalInfoList.appendChild(personalInfoItem3)

var personalInfoItem4 = document.createElement('li')
personalInfoItem4.innerText = 'Email: fakeemail@gmail.com'

personalInfoList.appendChild(personalInfoItem4)

var certificationsTitle = document.createElement('h2')
certificationsTitle.innerText = 'Certifications'

document.body.appendChild(certificationsTitle)

var certificationsList = document.createElement('ul')
document.body.appendChild(certificationsList)

var certificationsItem1 = document.createElement('li')
certificationsItem1.innerText = 'Team Leader'

certificationsList.appendChild(certificationsItem1)

var certificationsItem2 = document.createElement('li')
certificationsItem2.innerText = 'Java Script Advance'

certificationsList.appendChild(certificationsItem2)

var education = document.createElement('h2')
education.innerText = 'Education'

document.body.appendChild(education)

var educationInfo = document.createElement('p')
educationInfo.innerText = 'Full Stack Development - ISDI Coders'

document.body.appendChild(educationInfo)

var fieldset = document.createElement('fieldset')
document.body.appendChild(fieldset)

var legend = document.createElement('legend')
legend.innerText = 'Do you like my profile'

fieldset.appendChild(legend)

var buttonYes = document.createElement('button')
buttonYes.innerText = 'Yes'

fieldset.appendChild(buttonYes)

var buttonNo = document.createElement('button')
buttonNo.innerText = 'No'

fieldset.appendChild(buttonNo)