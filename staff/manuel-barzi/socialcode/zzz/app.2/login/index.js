if (logic.isUserLoggedIn())
    location.href = '../home'

const view = new Component(document.body)
view.addClass('View')

const title = new Heading(1)
title.setText('Login')

const loginForm = new LoginForm
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
            loginForm.setFeedback(error.message + ', please, correct it')
        else if (error instanceof MatchError)
            loginForm.setFeedback('wrong credentials')
        else
            loginForm.setFeedback('sorry, there was an error, please try again later')
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