var view = new Component(document.body)
view.addClass('View')

var title = new Heading(1)
title.setText('Register')
title.onClick(function () {
    alert('By clicking on this title you wont get anything ^_^')
})

var registerForm = new RegisterForm()
registerForm.onSubmit(function(event) {
    event.preventDefault()

    // PRESENTACION
    var email = registerForm.getEmail()
    var username = registerForm.getUsername()
    var password = registerForm.getPassword()
    var passwordRepeat = registerForm.getRetypePassword()


    try{
        if(logic.registerUser(email, username, password, passwordRepeat))

            registerForm.clear()
    }catch(error){
        if (error instanceof ContentError) 
        registerForm.setFeedback(error.message + '. please, repeat it')
        
        if(error instanceof MatchError)
        registerForm.setFeedback(error.message + '. please, repeat them')

        else if(error instanceof DuplicityError)
        registerForm.setFeedback(error.message + '. please, enter new one')

    else
        registerForm.setFeedback('sorry, there was an error, please try again later')
    }
})

var loginLink = new Link
loginLink.setText('Login')
//loginLink.setUrl('../login')
loginLink.onClick(function (event) {
    event.preventDefault()

    setTimeout(function () {
        location.href = '../login'
    }, 1000)
})

view.add(title)
view.add(registerForm)
view.add(loginLink)











