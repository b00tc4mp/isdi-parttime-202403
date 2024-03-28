//head
var title = document.querySelector("title");
title.innerText = "C-3PO Cv";

var head = document.querySelector("head");
head.style = "fontLink";

var fontLink = document.createElement("link");
fontLink.href =
  "https://fonts.googleapis.com/css2?family=Orbitron:wght@400..900&display=swap";
fontLink.rel = "stylesheet";

document.head.appendChild(fontLink);

//body
//Header1
var headerBody = document.createElement("h1");
headerBody.innerText =
  "Welcome! Carbon-based decision-makers… oh, I beg your pardon, I mean humans. 🧑‍💻";

headerBody.style.textAlign = "center";

document.body.appendChild(headerBody);
// Imagen
var imagen = new Image();
imagen.src =
  'https://th.bing.com/th/id/R.71fcc71e0e0a5815d9b5aee14513d150?rik=87r8OgKMjmba8Q&amp;riu=http%3a%2f%2fwww.theoldrobots.com%2fimages27%2fC-3PO-4.JPG&amp;ehk=Op%2fEcX6cDm6%2bSVrDA8XhRn2GP0tOB3JdYugEDtzwg4M%3d&amp;risl=&amp;pid=ImgRaw&amp;r=0" alt="On the Set of Star Tours with C-3PO | Disney Parks Blog" class=" nofocus" tabindex="0" aria-label="On the Set of Star Tours with C-3PO | Disney Parks Blog" role="button';

imagen.width = 250;
imagen.height = 250;
imagen.style.display = "block";
imagen.style.margin = "auto";

document.body.appendChild(imagen);
//Header2
var androidInfo = document.createElement("h3");
androidInfo.innerText = "My name is C-3PO ";

androidInfo.style.textAlign = "center";

document.body.appendChild(androidInfo);
//Barra 
var inputSelector = document.createElement("input");
inputSelector.placeholder = "Define tu lenguaje";
inputSelector.style.alignItems = "center";

inputSelector.style.display = "block";
inputSelector.style.marginLeft = "auto";
inputSelector.style.marginRight = "auto";

var lenguaje = document.createElement("h4");
lenguaje.innerText =
  "Dime en que lenguaje quieres que nos comuniquemos. Puedo hablar con fluidez en más de 6 millones de formas de comunicación, incluyendo Shyriiwook, Bocce y Huttese.";

lenguaje.style.textAlign = "center";

document.body.appendChild(lenguaje);

document.body.appendChild(inputSelector);

//Boton //Boton

// Crear el botón
var boton = document.createElement('button');
boton.innerHTML = 'Enviar';

boton.style.display = "block";
boton.style.marginLeft = "auto";
boton.style.marginRight = "auto";

boton.onclick = function() {
  alert(
    "-¿Sabes cuál es el idioma favorito de un droide? \n-¡El binario, porque siempre tienen algo que contar!"
  );
};

// Añadir el botón al cuerpo del documento
document.body.appendChild(boton);

//Header3
var androidInfoR = document.createElement("h4");
androidInfoR.innerText =
  "Droide de Protocolo con Experiencia en Relaciones Intergalácticas";

androidInfoR.style.textAlign = "center";

document.body.appendChild(androidInfoR);
//P
var resumeText = document.createElement("p");
resumeText.innerText =
  "Droide de protocolo bilingüe y multilingüe con más de 40 años de experiencia en la asistencia a figuras clave en eventos históricos galácticos. Especializado en traducciones y negociaciones, con un conocimiento excepcional de diversas culturas y costumbres interplanetarias.";

resumeText.style.textAlign = "center";

document.body.appendChild(resumeText);
//Habilidades Técnicas
var headerHT = document.createElement("h3");
headerHT.innerText = "Habilidades Técnicas";

headerHT.style.textAlign = "center";

document.body.appendChild(headerHT);

var skillList = document.createElement("ul");

var skill1 = document.createElement("li");
skill1.innerText = "Dominio de más de 6 millones de formas de comunicación.";

skillList.appendChild(skill1);

var skill2 = document.createElement("li");
skill2.innerText = "Experto en etiqueta y protocolo intergaláctico.";

skillList.appendChild(skill2);

var skill3 = document.createElement("li");
skill3.innerText =
  "Habilidad para resolver conflictos y facilitar la comunicación entre especies y culturas diversas.";

skillList.appendChild(skill3);

var skill4 = document.createElement("li");
skill4.innerText =
  "Conocimientos avanzados en reparaciones menores y mantenimiento de droides.";

skillList.appendChild(skill4);

document.body.appendChild(skillList);
//Header4
var experienciaHeader = document.createElement("h3");
experienciaHeader.innerText = "Experiencia";

experienciaHeader.style.textAlign = "center";

document.body.appendChild(experienciaHeader);
//Rebelion
var asistant = document.createElement("h4");
asistant.innerText = "Asistente de Relaciones Intergalácticas";

document.body.appendChild(asistant);

var asistantP = document.createElement("p");
asistantP.innerText = "Rebelión Aliada, La Galaxia";

document.body.appendChild(asistantP);

var assistantList = document.createElement("ul");

var assisExperience1 = document.createElement("li");
assisExperience1.innerText =
  "Facilitó la comunicación y las negociaciones entre la Alianza Rebelde y diversas facciones.";

assistantList.appendChild(assisExperience1);

var assisExperience2 = document.createElement("li");
assisExperience2.innerText =
  "Tradujo en situaciones de alto riesgo para asegurar el éxito de misiones diplomáticas y de espionaje.";

assistantList.appendChild(assisExperience2);

document.body.appendChild(assistantList);
//Traductor y Mediador
var asistant = document.createElement("h4");
asistant.innerText = "Traductor y Mediador";

document.body.appendChild(asistant);

var asistantP = document.createElement("p");
asistantP.innerText = "Senado Galáctico, Coruscant";

document.body.appendChild(asistantP);

var rebelionList = document.createElement("ul");

var rebelionExperience1 = document.createElement("li");
rebelionExperience1.innerText =
  "Sirvió como enlace entre senadores y delegaciones extranjeras durante sesiones críticas del Senado.";

rebelionList.appendChild(rebelionExperience1);

var rebelionExperience2 = document.createElement("li");
rebelionExperience2.innerText =
  "Aseguró la precisión en la traducción de tratados y acuerdos interplanetarios.";

rebelionList.appendChild(rebelionExperience2);

document.body.appendChild(rebelionList);

//Referencias
var refHeader = document.createElement("h3");
refHeader.innerText = "Referencias";

refHeader.style.textAlign = "center";

document.body.appendChild(refHeader);

var experienceList = document.createElement("ul");

var experiencesTitles = [
  "Han Solo, Capitán del Halcón Milenario.",
  "Leia Organa, General de la Resistencia.",
  "Luke Skywalker, Maestro Jedi.",
];

for (var i = 0; i < experiencesTitles.length; i++) {
  var experienceTitle = experiencesTitles[i];
  var experienceItem = document.createElement("li");
  experienceItem.innerText = experienceTitle;
  experienceList.appendChild(experienceItem);
}

document.body.appendChild(experienceList);

//Footer

var footerBottom = document.createElement("footer");
footerBottom.innerText =
  "Si me necesitan, estaré en la galaxia vecina tomando un aceite de motor. ¡Hasta la próxima, humanos!🤖";

footerBottom.style.textAlign = "center";

document.body.appendChild(footerBottom);
