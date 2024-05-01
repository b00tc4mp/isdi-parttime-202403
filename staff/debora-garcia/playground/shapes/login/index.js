if (logic.isUserLoggedIn())// si has hecho login no puedas acceder a la pagina hasta hacer logout
    location.href = "../home"

var view = new Component(document.body)

view.addClass("View")

var title = new Heading(1)
title.setText("Login")

var loginForm = new LoginForm
loginForm.onSubmit(function (event) {
    event.preventDefault()
    console.log("submit")

    var username = loginForm.getUsername()
    var password = loginForm.getPassword()

    console.log(username, password)

    try {
        logic.loginUser(username, password)

        loginForm.clear()

        loginForm.setFeedback("Log in succesful", "succes")

        setTimeout(function () {
            location.href = "../home"
        }, 1500)
    } catch (error) {
        if (error instanceof ContentError)
            loginForm.setFeedback(error.message + " please, correct it")
        else if (error instanceof MatchError)
            loginForm.setFeedback("wrong credentials")
        else
            loginForm.setFeedback("sorry, there was an error, please try again")


    }
})


var registerLink = new Link
registerLink.setText("Register")

registerLink.onClick(function (event) {
    event.preventDefault()
    setTimeout(function () {
        location.href = "../register"
    }, 1000)
})

view.add(title)
view.add(loginForm)
view.add(registerLink)
