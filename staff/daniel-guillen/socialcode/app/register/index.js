/* Se comprueba si el usuario ya está conectado. Si el usuario ha iniciado sesión, lo redirigirá a la página de 'home'.
Esta es una práctica común en las aplicaciones web para redirigir automáticamente a los usuarios.
a una página específica si ya están logueados.*/
if (logic.isUserLoggedIn())
    location.href = '../home'

const view = new Component(document.body)
view.addClass('View')

const title = new Heading(1)
title.setText('Welcome - Register')
title.onClick(() => alert('By clicking on this title you wont get anything 😒'))

/* Aqui se maneja el envío de un formulario de registro.
Cuando se envía el formulario, evita el comportamiento de envío de formulario por defecto,
se recupera los valores de entrada de los campos del formulario (nombre, apellido, correo electrónico, nombre de usuario, contraseña, contraseñaRepeat)
para hacer el guardado con la funcion en logic 'registerUser' si son validos se redirige a 'login'
sino se recibira avisos o errores mediante Feedbacks dentro del Form */

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

        registerForm.setFeedback('user successfully registered', 'success')

        setTimeout(() => location.href = '../login', 1000)
    } catch (error) {
        if (error instanceof ContentError)
            registerForm.setFeedback(error.message + ', please, correct it')
        else if (error instanceof MatchError)
            registerForm.setFeedback(error.message + ', please, retype them')
        else if (error instanceof DuplicityError)
            registerForm.setFeedback(error.message + ', please, enter new one')
        else
            registerForm.setFeedback('sorry, there was an error, please try again later')
    }
})

const loginLink = new Link
loginLink.setText('Login')
loginLink.onClick(event => {
    event.preventDefault()

    setTimeout(() => location.href = '../login', 500)
})

view.add(title)
view.add(registerForm)
view.add(loginLink)