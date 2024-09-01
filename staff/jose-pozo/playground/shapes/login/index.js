if (logic.isUserLoggedIn())
    location.href = '../home'

var view = new Component(document.body)
view.addClass('view')


var loginForm = new LoginForm()

var image = new Image()
image.setSrc('../assets/man.png')
image.addClass('man')

var loginForm = new LoginForm
loginForm.onSubmit(function (event) {
    event.preventDefault()

    var username = loginForm.getUsername()
    var password = loginForm.getPassword()

    try {
        logic.loginUser(username, password)

        loginForm.clear()

        loginForm.setFeedback('user successfully logged in', 'success')

        setTimeout(function () {
            location.href = '../home'
        }, 1000)
    } catch (error) {
        if (error instanceof ContentError)
            loginForm.setFeedback(error.message + ', please, correct it')
        else if (error instanceof MatchError)
            loginForm.setFeedback('wrong credentials')
        else
            loginForm.setFeedback('sorry, there was an error, please try again later')
    }
})

view.add(image)
view.add(loginForm)

