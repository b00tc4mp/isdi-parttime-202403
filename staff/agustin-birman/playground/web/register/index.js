const view = new Component(document.body)
view.addClass('View')

const title = new Heading(1)
title.setText('Register')
title.onClick(() => {
    alert('By clicking on this title you wont get anything .P')
})

const registerForm = new RegisterForm
registerForm.onSubmit(function (event) {
    event.preventDefault()

    const email = registerForm.getEmail()
    const username = registerForm.getUsername()
    const password = registerForm.getPassword()
    const passwordRepeat = registerForm.getPasswordRepeat()

    try {
        logic.registerUser(email, username, password, passwordRepeat)

        registerForm.clear()
    } catch (error) {
        if (error instanceof ContentError)
            registerForm.setFeedback(error.message + ', please, correct it')
        if (error instanceof MatchError)
            registerForm.setFeedback(error.message + ', please, retype them')
        else if (error instanceof DuplicityError)
            registerForm.setFeedback(error.message + ', please, enter new one')
        else
            registerForm.setFeedback('sorry, there was an error, please try again later')
    }
})

const loginLink = new Link
loginLink.setText('Login')
//loginLink.setUrl('../login') // la opcion mas corta
loginLink.onClick(event => {
    event.preventDefault()

    setTimeout(() => location.href = '../login', 500)
})

view.add(title)
view.add(registerForm)
view.add(loginLink)