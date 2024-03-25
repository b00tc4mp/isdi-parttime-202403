document.body.style.fontFamily = "Comic Sans MS";
document.body.style.margin = "5 0 0 0";
document.body.style.padding = "0 0";

var title = document.createElement('h1');
title.innerText = "epic button presentation: ";
document.body.appendChild(title);

var epicButtonContainer = document.createElement('div');
epicButtonContainer.style.display = "inline-block";
document.body.appendChild(epicButtonContainer);

var bP_kewlContainer = document.createElement('div');
bP_kewlContainer.style.display = "inline-block";
bP_kewlContainer.style.position = "absolute"
bP_kewlContainer.style.left = "500px";
bP_kewlContainer.style.top = "45px"
document.body.appendChild(bP_kewlContainer);

var bP_kewl = new Image();
bP_kewl.src = './bP_kewl.webp'
bP_kewl.style.width = "120px";
bP_kewl.style.visibility = "hidden";
bP_kewlContainer.appendChild(bP_kewl);

var epicButton = document.createElement('button');
epicButton.textContent = "epic";
epicButton.style.fontFamily = "Comic Sans MS";
epicButton.style.fontWeight = "bold";
epicButton.style.cursor = "pointer";
epicButtonContainer.appendChild(epicButton);

var epicText = document.createElement(paragraph);
epicText.style.marginLeft = "5px";
epicText.innerText = "epic";
epicText.style.visibility = "hidden";
epicButtonContainer.appendChild(epicText);

epicButton.addEventListener('click', function() {
    epicText.style.visibility = "visible";

    bP_kewl.style.visibility = "visible"
    setTimeout(function() {
        epicText.style.visibility = "hidden";

        bP_kewl.style.visibility = "hidden"
    }, 1000);
});

var firstParagraph = document.createElement('p');
firstParagraph.innerText = " yo yo yo, this button is pretty epic isn't it? (click it) \n pretty cool huh ? no?? \n well, if that doesnt convince you then maybe these reasons will:"
document.body.appendChild(firstParagraph);

//
var secondTitle = document.createElement('h2');
secondTitle.innerText = "here are a few reasons why I think this button is epic: ";
document.body.appendChild(secondTitle);

var epicButtonList = document.createElement('ul');
document.body.appendChild(epicButtonList);

var listItem1 = document.createElement('li');
listItem1.innerText = 'this button says epic';
epicButtonList.appendChild(listItem1);

var listItem2 = document.createElement('li');
listItem2.innerText = 'this button is gray';
epicButtonList.appendChild(listItem2);

var listItem3 = document.createElement('li');
listItem3.innerText = 'this button says epic when you click it';
epicButtonList.appendChild(listItem3);

var listItem4 = document.createElement('li');
listItem4.innerText = 'this button is in comic sans ! AND ITS BOLD !!!!';
epicButtonList.appendChild(listItem4);

//hoisting goes brrr
var paragraph = document.createElement('p');
paragraph.style.display = "inline-block";
document.body.appendChild(paragraph);