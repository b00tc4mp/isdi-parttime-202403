//var body = document.querySelector('body') formas de llamar al body
// abreviamos la llamada con var body
var body = document.body

//color de fondo del body
body.style.backgroundColor = "black"
//margen del body
body.style.margin = "20px"
//añadir fuente, tipo de letra para el body
var linkFontFamily = 'https://fonts.googleapis.com/css2?family=Workbench&display=swap'
var link = document.createElement('link')
link.href = linkFontFamily
link.rel = 'stylesheet'
body.appendChild(link)
body.style.fontFamily = 'Workbench','sans-serif'
//color para la letra del body
body.style.color = "white"

// Creamos el title
var headTitle = document.querySelector('title') //title es un elemento que se encuentra en el html
headTitle.innerText = 'CV - Pepito Grillo'

//Creamos un elemento nuevo h1
var title = document.createElement('h1')
title.style.color = 'red'
title.innerText = 'Curriculum Vitae - Pepito Grillo'
body.appendChild(title)

//Cargamos una imagen
var image = document.createElement('img')
image.src = 'https://www.ferrerferran.com/wp-content/uploads/pepito.jpg'
image.alt = "pepito con paraguas"
document.body.appendChild(image)
//Aplicamos styles a image
image.style.width ="150px"
image.style.borderRadius ="50%"

//hacemos un div
var divImage = document.createElement('div')
divImage.appendChild(image)
divImage.appendChild(title)
body.appendChild(divImage)
// Styles de divImage
divImage.style.display = 'flex'
divImage.style.justifyContent = 'center'
divImage.style.alignContent = 'center'
divImage.style.gap = '35px'
divImage.style.marginBottom = "50px"

//Creacion h2
var title = document.createElement('h2')
title.innerText = 'About me...'
document.body.appendChild(title)
//Styles h2
title.style.textAlign = 'center'
title.style.fontSize = '35px'

//Creacion p
var introDescription = document.createElement('p')
introDescription.innerText = "Soy Pepito Grillo y doy consejos a Pinocho, a veces valen y otras tampoco. Super pepito"
document.body.appendChild(introDescription)
//Styles p
introDescription.style.textAlign = 'center'
//div
var divIntro = document.createElement('div')
divIntro.appendChild(title)
divIntro.appendChild(introDescription)
body.appendChild(divIntro)
//style al divIntro
divIntro.style.backgroundColor = '#45bd2b'
divIntro.style.borderRadius = "10%"
divIntro.style.width = "600px"
//divIntro.style.height = 'auto'
divIntro.style.padding = '1px'





var certificationsTitle = document.createElement('h2')
certificationsTitle.innerText = "Certificaciones"
document.body.appendChild(certificationsTitle)

var certificationList = document.createElement('ul')
certificationList.id = 'contenido'

var certificationItem1 = document.createElement('li')
certificationItem1.innerText = 'Scrum Master'
var certificationItem2 = document.createElement('li')
certificationItem2.innerText = 'Master Of Universe'
var certificationItem3 = document.createElement('li')
certificationItem3.innerText = 'JavaScript'

certificationList.appendChild(certificationItem1)
certificationList.appendChild(certificationItem2)
certificationList.appendChild(certificationItem3)

document.body.appendChild(certificationList)

var experienceTitle = document.createElement('h2')
experienceTitle.innerText = 'Experiencia anterior'
// usar style en java
experienceTitle.style.textDecoration = 'underline'

var experecienceP = document.createElement('p')
experecienceP.innerText = 'Me pasé mucho años dando consejos a Pinocho, después me metí en el mundo IT'

document.body.appendChild(experienceTitle)
document.body.appendChild(experecienceP)

var projectsTitle = document.createElement('h2')
projectsTitle.innerText = 'ISDI_Coders'
var projectsList = document.createElement('ul')
var projectsItem1 = document.createElement('li')
projectsItem1.innerText = 'Dar consejos'
var projectsItem2 = document.createElement('li')
projectsItem2.innerText = 'Llevar paraguas'

projectsList.appendChild(projectsItem1)
projectsList.appendChild(projectsItem2)

document.body.appendChild(projectsTitle)
document.body.appendChild(projectsList)


var experienceTitle2 = document.createElement('h3')
experienceTitle2.innerText = 'Más experiencia'


// usando bucle for para listar

 var experienceList = document.createElement('ul')

 var experiencesTitles=['exp1','exp2','exp3']

for(let i = 0; i < experiencesTitles.length; i++){

    var experienceTitle = experiencesTitles[i]

    var experienceItem = document.createElement('li')
    experienceItem.innerText = experienceTitle

    experienceList.appendChild(experienceItem)
}

body.appendChild(experienceList)

 var experienceItem1 = document.createElement('li')
 experienceItem1.innerText = 'Software Architect '
 var experienceItem2 = document.createElement('li')
experienceItem2.innerText = "Twitter"


 experienceList.appendChild(experienceItem1)
 experienceList.appendChild(experienceItem2)

 document.body.appendChild(experienceTitle2)
 document.body.appendChild(experienceList)


 var button = document.createElement('button')
button.innerText = 'BOTóN'
document.body.appendChild(button)

//pequeña funcion del boton que dice hello y cambia fondo de la página
button.addEventListener('click', function() {

    body.style.backgroundColor = "blue"
    alert ('Hello')
})

/*button.style.borderRadius = '80%'
button.style.padding = '15px'

//reset
var resetButton = document.createElement('button')
resetButton.innerText = 'RESET'
document.body.appendChild(resetButton)

//pequeña funcion del boton que dice hello y cambia fondo de la página
button.addEventListener('click', function() {

    body.style.backgroundColor = "black"
    alert ('Volviendo...')
})


button.style.borderRadius = '80%'
button.style.padding = '15px'*/