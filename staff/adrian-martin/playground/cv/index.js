document.title = 'CV - Adrian Martin Gonzalo';
document.body.style.margin = '20px'

var fontLink = document.createElement('link')
fontLink.href = 'https://fonts.googleapis.com/css2?family=Workbench&display=swap'
fontLink.rel = 'stylesheet'
document.head.appendChild(fontLink)

var style = document.createElement('style')
style.innerHTML = 'body { background-color: black; font-family: Workbench; color: greenyellow; margin: 5vw; }'
document.body.appendChild(style)

var title = document.createElement('h1');
title.innerText = 'CV - Adrian Martin Gonzalo';
document.body.appendChild(title);

var introTitle = document.createElement('h2');
introTitle.innerText = 'Intro';
document.body.appendChild(introTitle);

var introDescription = document.createElement('p');
introDescription.innerText = 'Aquí puedes agregar una descripción sobre ti.';
document.body.appendChild(introDescription);

var certificationTitle = document.createElement('h2');
certificationTitle.innerText = 'Certificaciones';

certificationTitle.style.textDecoration = 'underline'

document.body.appendChild(certificationTitle);

var certificationList = document.createElement('ul');

var certificationTitleArray = [
    'Preimpresión Digital',
    'Full Stack Develop ISDI Coders'
]

for(var i = 0; i < certificationTitleArray.length; i++){
    var certificationTitle = certificationTitleArray[i]

    var certificationItem = document.createElement('li')
    certificationItem.innerText = certificationTitle

    certificationList.appendChild(certificationItem)
}

document.body.appendChild(certificationList);

var experienceTitle = document.createElement('h2');
experienceTitle.innerText = 'Experiencia';

experienceTitle.style.textDecoration = 'underline'

document.body.appendChild(experienceTitle);

var experiencesList = document.createElement('ul');

var experienceTitlesArray = [
    "Dosa - 6 meses",
    "Camarero - 6 meses",
    "Entrenador de futbol - 1 año"
]

for(var i = 0; i < experienceTitlesArray.length; i++){
    experienceTitle = experienceTitlesArray[i]

    var experienceItem = document.createElement('li')
    experienceItem.innerText = experienceTitle

    experiencesList.appendChild(experienceItem)

}

document.body.appendChild(experiencesList);

var languageTitle = document.createElement('h2');
languageTitle.innerText = 'Idiomas';

languageTitle.style.textDecoration = 'underline'

document.body.appendChild(languageTitle);

var languageList = document.createElement('ul')

var languageArray = [
    "Castellano",
    "English A2",
]

for(var i = 0; i < languageArray.length; i++){
    languageTitle = languageArray[i]

    var languageItem = document.createElement('li')
    languageItem.innerText = languageTitle

    languageList.appendChild(languageItem)
}

document.body.appendChild(languageTitle)