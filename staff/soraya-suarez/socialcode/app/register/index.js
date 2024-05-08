if (logic.isUserLoggedIn())
    location.href = '../home'

const view = new Component(document.body)
view.addClass('View')

const title = new Heading(1)
title.setText('Register')
title.onClick(() => alert('By clicking on this title you wont get anything .P'))

const registerForm = new RegisterForm
registerForm.onRegisterSubmit((name, surname, email, username, password, passwordRepeat) => {
    try {
        logic.registerUser(name, surname, email, username, password, passwordRepeat)
        registerForm.clear()
        registerForm.setFeedback('user successfully registered', 'success')
        location.href = '../home'
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
    location.href = '../login'
})

view.add(title)
view.add(registerForm)
view.add(loginLink)