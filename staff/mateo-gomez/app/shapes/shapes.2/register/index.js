//if (sessionStorage.username)
if (logic.isUserLoggedIn())
    location.href = '../home'

const view = new Component(document.body)
view.addClass('View')


const title = new Heading(1)
title.setText('Register')

title.onClick(function () {
    alert('Haciendo click aquí no vas a poder registrarte, prueba más abajo ⬇️')
})


const registerForm = new RegisterForm
registerForm.onSubmit(function (event) {
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
        registerForm.setFeedback('user successfuly success', 'success')



    } catch (error) {
        if (error instanceof ContentError)
            registerForm.setFeedback(error.message + ', por favor, corrijalo')
        else if (error instanceof MatchError)
            registerForm.setFeedback(error.message + ', please, retype them')
        else if (error instanceof DuplicityError)
            registerForm.setFeedback(error.message + ', please, enter new one')
        else
            registerForm.setFeedback('Lamentablemente ha ocurrido un error, intentelo más tarde')

    }

})





loginLink = new Link()
loginLink.setText('Login')
//loginLink.setUrl('../login')
loginLink.onClick(function (event) {
    event.preventDefault()

    setTimeout(() => location.href = '../login', 500)
})

view.add(title)
view.add(registerForm)
view.add(loginLink) 