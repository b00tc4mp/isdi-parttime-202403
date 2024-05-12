if (logic.isUserLoggedIn())
    location.href = '../home'

const view = new Component(document.body)
view.addClass('View')

const title = new Heading(1)
title.setText('SOCIAL CODE - Login')

/* Cuando se envía el formulario, se recupera el nombre de usuario y la contraseña ingresados ​​en los campos del loginForm,
se inicia sesión con usuario utilizando la función `logic.loginUser` si las credenciales proporcionadas son correctas.
Si los datos introducidos en los campos no son validos se lanzan avisos o errores mediante Feedback dentro de Form */
const loginForm = new LoginForm

loginForm.onLoginSubmit((username, password) => {
    try {
        logic.loginUser(username, password)

        loginForm.clear()

        loginForm.setFeedback('🎉 User logged in 🎉', 'success')

        setTimeout(() => location.href = '../home', 1000)
    } catch (error) {
        if (error instanceof ContentError)
            loginForm.setFeedback(error.message + ', please, correct it')
        else if (error instanceof MatchError)
            loginForm.setFeedback('wrong credentials')
        else
            loginForm.setFeedback('😵 sorry, please try again later')
    }
})


const registerLink = new Link
registerLink.setText('Register')
registerLink.onClick(event => {
    event.preventDefault()

    setTimeout(() => location.href = '../register', 500)
})

view.add(title)
view.add(loginForm)
view.add(registerLink)