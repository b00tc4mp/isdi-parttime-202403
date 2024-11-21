// var body= document.querySelector("body")
var body= document.body
//Crear estilos CSS con JS
body.style.backgroundColor="pink";





var headTitle=document.querySelector("title");
headTitle.innerText="CV-Debora Garcia";
// usaos  querySelector ya que title ya existe en el html
var title=document.createElement("h1");
title.innerText=headTitle.innerText;
document.body.appendChild(title);

var aboutMe=document.createElement("h2");
aboutMe.innerText="About me";
document.body.appendChild(aboutMe)

var aboutMeDescription=document.createElement("p");
aboutMeDescription.innerText="Introduce myself here.";
document.body.appendChild(aboutMeDescription);

// CAREER LAYOUT
var career=document.createElement("h2");
career.innerText="Career";
document.body.appendChild(career);

var careerList=document.createElement("ul");

var careerItem1=document.createElement("li");
careerItem1.innerText="AC. Marca";
careerList.appendChild(careerItem1);
document.body.appendChild(careerList);

var careerItem2=document.createElement("li");
careerItem2.innerText="KAO"
careerList.appendChild(careerItem2);
document.body.appendChild(careerList)

var careerItem3=document.createElement("li");
careerItem3.innerText="Reig Jofré";
careerList.appendChild(careerItem3);
document.body.appendChild(careerList);


var experiencesTitles=["Reig Jofré","AC. Marca","KAO"]


// CERTIFICATION LAYOUT

var certifications=document.createElement("h2");
certifications.innerText="Certifications";
document.body.appendChild(certifications);

var certificationsList=document.createElement("ul");

var certificationsItem1=document.createElement("li");
certificationsItem1.innerText="Laboratory technician (Joan Oró)";
certificationsList.appendChild(certificationsItem1);
document.body.appendChild(certificationsList);

var certificationsItem2=document.createElement("li");
certificationsItem2.innerText="Full Stuck Development (ISDI Coders)";
certificationsList.appendChild(certificationsItem2);
document.body.appendChild(certificationsList);



// LENGUAGES LAYOUT

var lenguages=document.createElement("h2");
lenguages.innerText="Lenguages";
document.body.appendChild(lenguages);

var lenguagesList=document.createElement("ul");

var lenguagesItem1=document.createElement("li");
lenguagesItem1.innerText="English: Proficency";
lenguagesList.appendChild(lenguagesItem1);
document.body.appendChild(lenguagesList);

var lenguagesItem2=document.createElement("li");
lenguagesItem2.innerText="Spanish: Native "
lenguagesList.appendChild(lenguagesItem2);
document.body.appendChild(lenguagesList);

var lenguagesItem3=document.createElement("li");
lenguagesItem3.innerText="Catalan: Native "
lenguagesList.appendChild(lenguagesItem3);
document.body.appendChild(lenguagesList);











 






