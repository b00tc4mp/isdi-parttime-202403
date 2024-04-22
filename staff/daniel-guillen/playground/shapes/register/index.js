var view = new Component(document.body)
view.addClass('View')

var title = new Heading(1)
title.setText('Register')
title.onClick(function () {
    alert('By clicking on this title you wont get anything .P')
})

var registerForm = new RegisterForm
registerForm.onSubmit(function (event) {
    event.preventDefault()

    var email = registerForm.getEmail()
    var username = registerForm.getUsername()
    var password = registerForm.getPassword()
    // var passwordRepeat = registerForm.getPasswordRepeat()

    var usersJson = localStorage.users

    if (!usersJson) usersJson = '[]'

    var users = JSON.parse(usersJson)

    var user = {
        email: email,
        username: username,
        password: password
    }

    users.push(user)

    usersJson = JSON.stringify(users)

    localStorage.users = usersJson

    registerForm.clear()
})

var loginLink = new Link
loginLink.setText('Login')
//Forma de hacerlo sin complicarse la vida //loginLink.setUrl('../login')
loginLink.onClick(function (event) {
    event.preventDefault()

    setTimeout(function () {
        location.href = '../login'
    }, 500)
})

view.add(title)
view.add(registerForm)
view.add(loginLink)

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