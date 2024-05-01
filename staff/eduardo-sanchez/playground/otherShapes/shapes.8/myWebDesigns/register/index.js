// if (sessionStorage.username)
//     location.href = '../home'

if (logic.isUserLoggedIn())
    location.href = '../home'

var view = new Component(document.body)
view.addClass('View')

var title = new Heading(1)
title.setText('Register')
title.onClick(function () {
    alert("By clicking on this title you wont get anything")

})

var registerForm = new RegisterForm()
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

        registerForm.clear();

        registerForm.setFeedback('user successfully registered', 'success')

        setTimeout(function () {

            location.href = '../login'
        }, 1000)

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

var loginLink = new LinK()

loginLink.setText('Login')
//loginLink.setUrl('../login')
loginLink.onClick(function (event) {
    event.preventDefault()

    setTimeout(function () {

        location.href = '../login'
    }, 500)
})

view.add(title)
view.add(registerForm)
view.add(loginLink)
