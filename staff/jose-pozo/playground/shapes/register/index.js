if (logic.isUserLoggedIn())
    location.href = '../home'

var view = new Component(document.body)
view.addClass('view')

var image = new Image()
image.setSrc('./woman.png')
image.addClass('woman')


var registerForm = new RegisterForm
registerForm.onSubmit(function (event) {
    event.preventDefault()

    var name = registerForm.getName()
    var surname = registerForm.getSurname()
    var email = registerForm.getEmail()
    var username = registerForm.getUsername()
    var password = registerForm.getPassword()
    var passwordRepeat = registerForm.getPasswordRepeat()


    try {
        logic.registerUser(name, surname, email, username, password, passwordRepeat)

        registerForm.clear()

        registerForm.setFeedback('user successfully registered', 'success')

        setTimeout(function () {
            location.href = '../login'
        }, 1000)

    } catch (error) {
        if (error instanceof ContentError)
            registerForm.setFeedback(error.message + ', please, correct it.')
        if (error instanceof MatchError)
            registerForm.setFeedback(error.message + ', please, retype it.')
        if (error instanceof DuplicityError)
            registerForm.setFeedback(error.message + ', please, entr new one.')
        else
            registerForm.setFeedback('Sorry, there was an error, please try again later.')
    }
})




view.add(image)
view.add(registerForm)
