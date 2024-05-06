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

const registerLink = new Link
registerLink.addClass('RegisterLink')
registerLink.setText('Register')
registerLink.onClick(event => {
    event.preventDefault()

    setTimeout(() => location.href = '../register', 500)
})

header.add(logo)
header.add(registerLink)

const title = new Heading(1)
title.setText('Login')
title.addClass('Title')

const loginForm = new LoginForm
loginForm.addClass('LoginForm')
loginForm.onSubmit(event => {
    event.preventDefault()

    const username = loginForm.getUsername()
    const password = loginForm.getPassword()

    try {
        logic.loginUser(username, password)

        loginForm.clear()

        loginForm.setFeedback('user successfully logged in', 'success')

        setTimeout(() => location.href = '../home', 1000)
    } catch (error) {
        if (error instanceof ContentError)
            loginForm.seFeedback(error.message + ', please, correct it')
        else if (error instanceof MatchError)
            loginForm.setFeedback('wrong credentials')
        else
            loginForm.setFeedback('sorry, there was an error, please try again later')
    }
})

view.add(header)
view.add(title)
view.add(loginForm)