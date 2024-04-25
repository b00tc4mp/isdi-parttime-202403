var view = new Component(document.body)
view.addClass('View')

var title = new Heading(1)
title.setText('Registrarse')

var registerForm = new RegisterForm
registerForm.onSubmit(function (event) {
    event.preventDefault()

    var email = registerForm.getEmail()
    var username = registerForm.getUsername()
    var password = registerForm.getPassword()
    var passwordRepeat = registerForm.getPasswordRepeat()

    try {
        logic.registerUser(email, username, password, passwordRepeat)

        registerForm.clear()
    } catch (error) {
        if (error instanceof ContentError)
            registerForm.setFeedback(error.message + '. Por favor, corrígelo')
        if (error instanceof MatchError)
            registerForm.setFeedback(error.message + '. Por favor, vuelve a escribirlo')
        else if (error instanceof DuplicityError)
            registerForm.setFeedback(error.message + '. Por favor, ingrese uno nuevo')
        else
            registerForm.setFeedback('Lo sentimos, hubo un error, inténtalo de nuevo más tarde.')
    }
})

var loginLink = new Link
loginLink.setText('Iniciar sesión')
loginLink.setUrl('../login')
//loginLink.setTarget('_blank')

view.add(title)
view.add(registerForm)
view.add(loginLink)