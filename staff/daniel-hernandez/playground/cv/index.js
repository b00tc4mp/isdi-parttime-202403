//declarations
var body = document.body;
var head = document.head;


//import font test 
var fontLink = document.createElement('link');
fontLink.rel = 'stylesheet';
fontLink.href = 'https://fonts.googleapis.com/css2?family=Workbench&display=swap';

head.appendChild(fontLink);
//

//modify all styles
var style = document.createElement('style');
style.innerHTML = '* { font-family: Comic Sans MS; margin: 5 0 0 0; }';
head.appendChild(style);
//

body.style.padding = "0 0";

var title = document.createElement('h1');
title.innerText = "epic button presentation: ";
body.appendChild(title);

var epicButtonContainer = document.createElement('div');
epicButtonContainer.style.display = "inline-block";
body.appendChild(epicButtonContainer);

var bP_kewlContainer = document.createElement('div');
bP_kewlContainer.style.display = "inline-block";
bP_kewlContainer.style.position = "absolute";
bP_kewlContainer.style.left = "500px";
bP_kewlContainer.style.top = "45px";
bP_kewlContainer.style.zIndex = '1000';
body.appendChild(bP_kewlContainer);

var bP_kewl = new Image();
bP_kewl.src = './bP_kewl.webp';
bP_kewl.style.width = "120px";
bP_kewlContainer.appendChild(bP_kewl);

var epicExplosion = new Image();
epicExplosion.src = './epicExplosion.svg';
epicExplosion.style.width = '250px';
epicExplosion.style.position = 'absolute';
epicExplosion.style.left = '480px';
epicExplosion.style.top = '15px'
epicExplosion.style.zIndex = '999';
epicExplosion.style.visibility = 'hidden';
body.appendChild(epicExplosion);

var epicButton = document.createElement('button');
epicButton.textContent = "epic";
epicButton.style.fontFamily = "Comic Sans MS";
epicButton.style.fontWeight = "bold";
epicButton.style.cursor = "pointer";
epicButtonContainer.appendChild(epicButton);

var epicText = document.createElement(paragraph);
epicText.style.marginLeft = "400px";
epicText.innerText = "epic";
epicText.style.visibility = "hidden";
epicButtonContainer.appendChild(epicText);

epicButton.addEventListener('click', function() {
    epicText.style.visibility = "visible";
    bP_kewl.src = './bP_smile.webp';
    epicExplosion.style.visibility = 'visible';

    setTimeout(function() {

        epicText.style.visibility = "hidden";
        bP_kewl.src = './bP_kewl.webp';
        epicExplosion.style.visibility = 'hidden';

    }, 1000);
});

var firstParagraph = document.createElement('p');
firstParagraph.innerText = " yo yo yo, this button is pretty epic isn't it? (click it) \n pretty cool huh ? no?? \n well, if that doesnt convince you then maybe these reasons will:";
body.appendChild(firstParagraph);

var secondTitle = document.createElement('h2');
secondTitle.innerText = "here are a few reasons why I think this button is epic: ";
body.appendChild(secondTitle);

var epicButtonListContent = [ 
    'this button says epic',
    'this button is gray',
    'this button says epic when you click it',
    'this button is in comic sans ! AND ITS BOLD !!!!'
];

var epicButtonList = document.createElement('ul');
body.appendChild(epicButtonList);

for(var i = 0; i < epicButtonListContent.length; i++){ 
    var listItem = document.createElement('li');

    listItem.innerText = epicButtonListContent[i];
    epicButtonList.appendChild(listItem);
};

//hoisting goes brrr
var paragraph = document.createElement('p');
paragraph.style.display = "inline-block";
body.appendChild(paragraph);