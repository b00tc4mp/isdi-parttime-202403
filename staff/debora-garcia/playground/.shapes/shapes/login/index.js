if (logic.isUserLoggedIn())// si has hecho login no puedas acceder a la pagina hasta hacer
    location.href = "../home"

const view = new Component(document.body)

view.addClass("View")

const title = new Heading(1)
title.setText("Login")

const loginForm = new LoginForm
loginForm.onSubmit(function (event) {
    event.preventDefault()
    console.log("submit")

    const username = loginForm.getUsername()
    const password = loginForm.getPassword()

    console.log(username, password)

    try {
        logic.loginUser(username, password)

        loginForm.clear()

        loginForm.setFeedback("Log in succesful", "succes")

        setTimeout(() => location.href = "../home", 1500)
    } catch (error) {
        if (error instanceof ContentError)
            loginForm.setFeedback(error.message + " please, correct it")
        else if (error instanceof MatchError)
            loginForm.setFeedback("wrong credentials")
        else
            loginForm.setFeedback("sorry, there was an error, please try again")


    }
})


const registerLink = new Link
registerLink.setText("Register")

registerLink.onClick(event => {
    event.preventDefault()
    setTimeout(() => location.href = "../register", 1000)
})

view.add(title)
view.add(loginForm)
view.add(registerLink)
