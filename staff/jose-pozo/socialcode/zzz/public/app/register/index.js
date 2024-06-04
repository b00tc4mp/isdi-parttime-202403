if (logic.isUserLoggedIn())
    location.href = '../home'

const view = new Component(document.body)
view.addClass('View')

const header = new Component('header')
header.addClass('Header')
view.add(header)

const logo = new Image
logo.setUrl('../assets/SocialCode.png')
logo.addClass('Logo')

const loginLink = new Link
loginLink.addClass('LoginLink')
loginLink.setText('Login')
loginLink.onClick(event => {
    event.preventDefault()

    setTimeout(() => location.href = '../login', 500)
})

header.add(logo)
header.add(loginLink)

const title = new Heading(1)
title.addClass('Title')
title.setText('Register')
title.onClick(() => alert('By clicking on this title you wont get anything .P'))

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

view.add(header)
view.add(title)
view.add(registerForm)
