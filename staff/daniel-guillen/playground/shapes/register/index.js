var view = new Component(document.body)
view.addClass('View')

var title = new Heading(1)
title.setText('Register')
title.onClick(function () {
    alert('Al hacer clic en este título no obtendrás nada')
})

var registerForm = new RegisterForm();
registerForm.onSubmit(function(event) {
    event.preventDefault();

    var passwordRepeat = registerForm.getPasswordRepeat();
    var password = registerForm.getPassword();
    
    if (password === passwordRepeat) {
        
        var email = registerForm.getEmail()
        var username = registerForm.getUsername()
        var password = registerForm.getPassword()

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
    
        window.location.reload()

    } else {
        alert("Las contraseñas no coinciden");
    }
});

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