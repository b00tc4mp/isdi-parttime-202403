if (logic.isUserLoggedIn())
    location.href = '../home'

const view = new Component(document.body)
view.addClass('View')

const title = new Heading(1)
title.setText('Registrarse')
title.onClick(() => alert('Al hacer clic en este título no obtendrás nada. .P'))

const registerForm = new RegisterForm
registerForm.onSubmit(event => {
    event.preventDefault()

    const name = registerForm.getName()
    const surname = registerForm.getSurname()
    const email = registerForm.getEmail()
    const username = registerForm.getUsername()
    const password = registerForm.getPassword()
    const passwordRepeat = registerForm.getPasswordRepeat()

    try {
        logic.registerUser(name, surname, email, username, password, passwordRepeat)

        registerForm.clear()
        registerForm.setFeedback('Usuario registrada con éxito', 'success')

        setTimeout(() => location.href = '../login', 1000)

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

const loginLink = new Link
loginLink.setText('Iniciar sesión')
loginLink.onClick(event => {
    event.preventDefault()

    setTimeout(() => location.href = '../login', 500)
})

view.add(title)
view.add(registerForm)
view.add(loginLink)