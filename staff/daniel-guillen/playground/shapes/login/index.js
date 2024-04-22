var view = new Component(document.body)
view.addClass('View')

var title = new Heading(1)
title.setText('Login')

var loginForm = new LoginForm
var registerLink = new Link
registerLink.setText('Register')
//Forma de hacerlo sin complicarse la vida //registerLink.setUrl('../register')
registerLink.onClick(function (event) {
    event.preventDefault()

    setTimeout(function () {
        location.href = '../register'
    }, 500)
})

view.add(title)
view.add(loginForm)
view.add(registerLink)

function ejecutaAlerta() {   
    var w = window.open('','','width=300,height=120');
    w.moveTo(500,500);
    w.scrollbars = 'no';
    w.directories = 'no';
    w.location = 'no';
    w.menubar = 'no';
    w.document.write('Esta siendo direccionado!');
        w.focus();
    setTimeout(function() {
        w.close();
    }, 4000);
}

var link = document.getElementById('isdiLink');
link.onclick = function(event) {
    event.preventDefault();
    console.log('Hola click');
    ejecutaAlerta();

    setTimeout(function() {
        window.location.href = link.href;
    }, 4000);
};