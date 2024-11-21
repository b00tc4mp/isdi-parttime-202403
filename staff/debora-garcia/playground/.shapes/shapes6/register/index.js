if (logic.isUserLoggedIn()) // Llamamos a esta funcion para comprobar si esta logeado no deje ir a la pagina de registro, de esta manera desde home no se puede acceder a la pgina de registro
    location.href = "../home"

var view = new Component(document.body)

view.addClass("View")

var title = new Heading(1)
title.setText("New account!")



var registerForm = new RegisterForm
registerForm.onSubmit(function (event) {
    event.preventDefault()
    console.log("submit")

    var email = registerForm.getEmail()
    var username = registerForm.getUsername()
    var password = registerForm.getPassword()
    var passwordRepeat = registerForm.getPasswordRepeat()
    console.log(email, username, password, passwordRepeat)

    try {
        logic.registerUser(email, username, password, passwordRepeat)

        //registerForm.clear()  no lo pongo por que se borran los campos y aparecen lo de placeholder
        // TODO mirar de eliminar el placeholder cuando se hace el clear()
        registerForm.setFeedback("Registration successful!", "succes")

        setTimeout(function () {
            location.href = "../login"
        }, 1500)
    } catch (error) {
        if (error instanceof ContentError)
            registerForm.setFeedback(error.message + " please, correct it")
        else if (error instanceof MatchError)
            registerForm.setFeedback(error.message + " please, retype them")
        else if (error instanceof DuplicityError)
            registerForm.setFeedback(error.message + " please, enter a new one ")
        else
            registerForm.setFeedback("sorry, there was an error, please try later")
    }
})

var loginLink = new Link
loginLink.setText("Login")
//loginLink.setUrl("../login") esta seria la forma rapida de que el link te redirigera a otra pagina
// pero lo haremos mediante JS:

loginLink.onClick(function (event) {
    event.preventDefault()
    setTimeout(function () {
        location.href = "../login"
    }, 1000)
})


view.add(title)
view.add(registerForm)
view.add(loginLink)
