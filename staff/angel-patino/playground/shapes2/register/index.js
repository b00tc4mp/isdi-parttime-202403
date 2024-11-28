    var view = new Component(document.body)
    view.addClass('View')

    var title = new Heading(1)
    title.setText('Register_Prueba')
    title.onClick(  function() {
        alert('By clicking on this title you wont get anything')
    })
    
    var registerForm = new RegisterForm
    registerForm.onSubmit(function (event) {
        event.preventDefautl()

        var email = registerForm.getEmail()
        var username = registerForm.getUsername()
        var password = registerForm.getPassword()
        var passwordRepeat = registerForm.getPasswordRepeat()

        try{
            logic.registerUser(email, username, password, passwordRepeat)

            registerForm.clear()

            registerForm.setFeedback('Register success', 'success')

            setTimeout( function() {
                registerForm.clear()

                location.href = '../login'
            }, 3000)
        } catch (error) {
            if(error instanceof ContentError)
                registerForm.setFeedback(error.message + ', please, correc it')
            if(error instanceof MatchError)
                registerForm.setFeedback(error.message + ', please, retype them')
            else if(error instanceof DuplicityError)
                registerForm.setFeedback(error.message + ',enter new one')
            else
            registerForm.setFeedback('Sorry, there was an error, please try again')
        }
    })

    var loginLink = new Link
    loginLink.setText('Login')
    loginLink.setUrl('../login')
    /*loginLink.onClick(function (event) {
        event.preventDefautl()

        setTimeout(function () {
            location.href = '../login/index.js'
        }, 1500)
    })
*/

    view.add(title)
    view.add(registerForm)
    view.add(loginLink)