if (logic.isUserLoggedIn())
    location.href = '../home'

var view = new Component(document.body)
view.addClass('View')

var title = new Heading(1)
title.setText('Registrarse')
title.onClick(function () {
    alert('Al hacer clic en este título no obtendrás nada. .P')
})

var registerForm = new RegisterForm
registerForm.onSubmit(function (event) {
    event.preventDefault()

    var name = registerForm.getName()
    var surname = registerForm.getSurname()
    var email = registerForm.getEmail()
    var username = registerForm.getUsername()
    var password = registerForm.getPassword()
    var passwordRepeat = registerForm.getPasswordRepeat()

    try {
        logic.registerUser(name, surname, email, username, password, passwordRepeat)

        registerForm.clear()
        registerForm.setFeedback('user sucessfully registered', 'success')

        setTimeout(function () {
            location.href = '../login'
        }, 1000)

    } catch (error) {
        if (error instanceof ContentError)
            registerForm.setFeedback(error.message + '. Por favor, corrígelo')
        else if (error instanceof MatchError)
            registerForm.setFeedback(error.message + '. Por favor, vuelve a escribirlo')
        else if (error instanceof DuplicityError)
            registerForm.setFeedback(error.message + '. Por favor, ingrese uno nuevo')
        else
            registerForm.setFeedback('Lo sentimos, hubo un error, inténtalo de nuevo más tarde.')
    }
})

var loginLink = new Link
loginLink.setText('Iniciar sesión')
loginLink.onClick(function (event) {
    event.preventDefault()

    setTimeout(function () {
        location.href = '../login'
    }, 500)
})
//loginLink.setUrl('../login')
//loginLink.setTarget('_blank')

view.add(title)
view.add(registerForm)
view.add(loginLink)