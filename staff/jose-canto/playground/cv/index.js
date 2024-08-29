//body styles
var body = document.body
body.style.background = 'linear-gradient(to right, #15181A, #15181A, #212629, #212629, #212629, #212629, #383f46, #3d444b, #444b52, #4b525a, #525a61, #596169)';
body.style.color = "greenyellow"
body.style.display = "flex"
body.style.flexDirection = "column"
body.style.alignItems = "center"

// font
var urlFontFamily = "https://fonts.googleapis.com/css2?family=Workbench&display=swap"
var link = document.createElement('link')
link.href = urlFontFamily
link.rel = 'stylesheet'
document.head.appendChild(link)
body.style.fontFamily = "Workbench", "sans-serif";

// Title (head)
var headTitle = document.querySelector('title')
headTitle.innerText = 'Pepito Grillo'

// H1 Title
var h1Title = document.createElement('h1')
h1Title.innerText = headTitle.innerText

//image Pepito
var imgPepito = document.createElement('img')
imgPepito.src = "https://i.ibb.co/hBCrQ3V/pepito.jpg"

// Styles image Pepito
imgPepito.style.width = "150px"
imgPepito.style.borderRadius = "50%"
imgPepito.style.border = "3px solid grey"
imgPepito.style.padding = "5px"
imgPepito.style.backgroundColor = "greenyellow"
imgPepito.style.marginRight = "15px"

// div Img Pepito and H1
var divImgH1 = document.createElement('div')
divImgH1.appendChild(imgPepito)
divImgH1.appendChild(h1Title)
document.body.appendChild(divImgH1)

//styles div Img Pepito and H1
divImgH1.style.display = "flex"
divImgH1.style.justifyContent = "center"
divImgH1.style.alignItems = "center"
divImgH1.style.gap = "10px"
divImgH1.style.marginTop = "10px"

// Title styles
h1Title.style.fontSize = "50px"

// Intro Title
var introTitle = document.createElement('h2')
introTitle.innerText = "Sobre mi..."

document.body.appendChild(introTitle)

// Style Intro Title
introTitle.style.fontSize = "30px"

introTitle.style.borderRadius = "20px"
introTitle.style.padding = "10px"
introTitle.style.borderInlineStyle = "solid"

// Intro Description
var introDescription = document.createElement('p')
introDescription.innerText = "Soy un desarrollador web apasionado con más de 3 años de experiencia en la creación de sitios web dinámicos y funcionales. Me especializo en tecnologías como HTML, CSS, JavaScript y React, y tengo un historial probado de entrega de proyectos de alta calidad en plazos ajustados. Soy un solucionador de problemas creativo y colaborativo, capaz de trabajar de manera efectiva tanto de forma independiente como en equipo."

document.body.appendChild(introDescription)

// Style Intro Description
introDescription.style.fontSize = "18px"
introDescription.style.width = "800px"
introDescription.style.textAlign = "center"
introDescription.style.lineHeight = "1.5"

// Certifications Title
var certificationsTitle = document.createElement('h2')
certificationsTitle.innerText = 'Certifications'

document.body.appendChild(certificationsTitle)

// Style Certifications Title
certificationsTitle.style.fontSize = "30px"
certificationsTitle.style.padding = "10px"
certificationsTitle.style.borderTopWidth = "15px";
certificationsTitle.style.borderTopStyle = "double";
certificationsTitle.style.borderTopColor = "black";
certificationsTitle.style.borderBottomWidth = "15px";
certificationsTitle.style.borderBottomStyle = "double";

certificationsTitle.style.borderBottomColor = "black";


// Certifications List
var certificationsList = document.createElement('ul')
var certificationTitles = ['Scrum Master', 'Full Stack Developer (ISDI Coders)', "Certification Freecodecamp"]

for (var i = 0; i < certificationTitles.length; i++) {
  var certificationTitle = certificationTitles[i]

  var certificationItem = document.createElement('li')
  certificationItem.innerText = certificationTitle
  certificationsList.appendChild(certificationItem)
}
document.body.appendChild(certificationsList)

// Styles Certifications List
certificationsList.style.display = "flex"
certificationsList.style.flexDirection = "column"
certificationsList.style.alignItems = "start"
certificationsList.style.gap = "10px"
certificationsList.style.fontSize = "18px"

// Experience Title
var experienceTitle = document.createElement('h2')
experienceTitle.innerText = 'Experience'
document.body.appendChild(experienceTitle)

//Styles Experience Title
experienceTitle.style.fontSize = "30px"
experienceTitle.style.padding = "10px"
experienceTitle.style.borderInlineEndStyle = "double"
experienceTitle.style.borderInlineStartStyle = "double"
experienceTitle.style.borderInlineColor = "black"
experienceTitle.style.borderInlineWidth = "15px"

// Experience List
var experienceList = document.createElement('ul')

var experienceOne = document.createElement('li')
experienceOne.innerText = 'Software Engineer at Google (2010-2012)'
experienceList.appendChild(experienceOne)

var experienceTwo = document.createElement('li')
experienceTwo.innerText = 'Software Engineer at Amazon (2013-2015)'
experienceList.appendChild(experienceTwo)

var experienceThree = document.createElement('li')
experienceThree.innerText = 'Software Developr at Twitter (2015-2020)'
experienceList.appendChild(experienceThree)

document.body.appendChild(experienceList)

// Styles Experience List
experienceList.style.display = "flex"
experienceList.style.flexDirection = "column"
experienceList.style.alignItems = "start"
experienceList.style.gap = "10px"

// Link Title
var titleLink = document.createElement('h2')
titleLink.innerText = '+ Info Link'
document.body.appendChild(titleLink)

// Link INFO
var urlLink = document.createElement('a');
urlLink.innerText = 'Diario Notion Bootcamp ISDI Coders';
urlLink.href = 'https://frill-scorpio-cd1.notion.site/BOOTCAMP-ISDICODERS-c92377c6fcc64696bd6ff37508770e14?pvs=4';

document.body.appendChild(urlLink)

// Styles Link Info
urlLink.style.border = "3px solid green"
urlLink.style.padding = "20px"
urlLink.style.borderRadius = "30px"
urlLink.style.color = "green"
urlLink.style.borderTopStyle = "solid"
urlLink.style.fontSize = "30px"

urlLink.addEventListener('mouseover', () => {
  urlLink.style.backgroundColor = "lightgreen"
  urlLink.style.color = "black"
})
urlLink.addEventListener('mouseout', () => {
  urlLink.style.backgroundColor = "transparent"
  urlLink.style.color = "green"
})

// Button
var imageVisible = false
var button = document.createElement("button")
button.innerText = "Bye Bye!"

button.addEventListener('click', () => {
  if (imageVisible === true) {
    document.body.removeChild(img)
    imageVisible = false
  } else {
    document.body.appendChild(img)
    imageVisible = true
    img.scrollIntoView({ behavior: "smooth" }) // behavior suaviza el scroll 
  }
})
document.body.appendChild(button)

// Styles Button
button.style.marginTop = "20px"
button.style.marginBottom = "50px"
button.style.borderRadius = "20px"
button.style.padding = "10px"
button.style.borderInlineStyle = "solid"
button.style.cursor = "pointer"
button.style.backgroundColor = "green"
button.style.fontSize = "20px"
button.style.fontFamily = "Workbench", "sans-serif;"

// Imagen
var img = document.createElement("img")
img.src = "https://freepngimg.com/thumb/jiminy_cricket/31973-5-jiminy-cricket-file.png"

// Styles Imagen
img.style.maxWidth = "300px"
img.style.marginBottom = "50px"
img.style.padding = "10px"

//Footer
var footer = document.createElement('footer')
footer.innerHTML = 'Made with ❤️ by Jose A.Canto'

document.body.appendChild(footer)

// Styles Footer
footer.style.position = "fixed"
footer.style.bottom = "0"
footer.style.backgroundColor = "black"
footer.style.width = "100%"
footer.style.height = "40px"
footer.style.display = "flex"
footer.style.justifyContent = "center"
footer.style.alignItems = "center"
