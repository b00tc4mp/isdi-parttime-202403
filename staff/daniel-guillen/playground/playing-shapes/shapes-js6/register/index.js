if (logic.isUserLoggedIn())
    location.href = '../home'

const view = new Component(document.body)
view.addClass('View')

const titleGame = new Heading(1)
titleGame.setText('Encuentra el Punto Blanco')
view.add(titleGame)

const title = new Heading(2)
title.setText('Guarde sus datos de usuario')
title.onClick(() => alert('Al hacer clic en este título no encontrara el punto'))
view.add(title)

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

        registerForm.setFeedback("✅ Usuario guardado!", "success")

        setTimeout(() => location.href = '../login', 3000)

    }
    catch (error) {
        if (error instanceof ContentError) {
            registerForm.setFeedback(error.message + ', por favor, corríjalo ❌')
        }
        else if (error instanceof MatchError) {
            registerForm.setFeedback(error.message + ', por favor, vuelva a intentarlo ❌')
        }
        else if (error instanceof DuplicityError) {
            registerForm.setFeedback(error.message + ', por favor, pruebe uno nuevo ❌')
        }
        else{
            registerForm.setFeedback('Disculpe las molestias, pruebe más tarde')
        }
        setTimeout(() => registerForm.setFeedback(""), 3000)
}})

const loginLink = new Link
loginLink.setText('Entrar con Usuario')
loginLink.onClick(event => {
    event.preventDefault()

    setTimeout(() => location.href = '../login', 1000)
})

view.add(registerForm)
view.add(loginLink)