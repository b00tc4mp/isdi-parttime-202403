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

loginForm.onLoggedIn(() => setTimeout(() => location.href = '../home', 3000))


const registerLink = new Link
registerLink.setText('Register')
registerLink.onClick(event => {
    event.preventDefault()

    setTimeout(() => location.href = '../register', 1000)
})

view.add(title)
view.add(loginForm)
view.add(registerLink)