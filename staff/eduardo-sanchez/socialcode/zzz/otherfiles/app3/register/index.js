if (logic.isUserLoggedIn())
    location.href = '../home'

const view = new Component(document.body)
view.addClass('View')

const title = new Heading(1)
title.setText('Register')
title.onClick(() => alert("By clicking on this title you wont get anything"))

const registerForm = new RegisterForm()
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

        registerForm.clear();

        registerForm.setFeedback('user successfully registered', 'success')

        setTimeout(() => location.href = '../login', 1000)

    } catch (error) {
        if (error instanceof ContentError)
            registerForm.setFeedback(error.message + ', please correct it')

        else if (error instanceof MatchError)
            registerForm.setFeedback(error.message + ', please retype it')

        else if (error instanceof DuplicityError)
            registerForm.setFeedback(error.message + ', please enter new one')

        else
            registerForm.setFeedback('an unexpected error happened, try again later')
    }

})

const loginLink = new LinK()

loginLink.setText('Login')

loginLink.onClick(event => {
    event.preventDefault()

    setTimeout(() => location.href = '../login', 500)

})

view.add(title)
view.add(registerForm)
view.add(loginLink)
