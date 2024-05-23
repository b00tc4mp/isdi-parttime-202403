if(logic.isUserLoggedIn())
location.href = '../home'

var view = new Component(document.body)

view.addClass('View')

var title = new Heading(1)
title.setText('Login')
title.onClick(function() {
    alert('Remember, there will always be a better half for you.')
})

var loginForm = new LoginForm
loginForm.onSubmit(function(event) {
    event.preventDefault()

    var username = loginForm.getUsername()
    var password = loginForm.getPassword()


    try{
        logic.loginUser(username, password)

        loginForm.clear()

        loginForm.setFeedback('user successfully logged in', 'success')

        setTimeout(function () {
            location.href = '../home'
        }, 500)
        
    }catch(error){
        if (error instanceof ContentError) 
            loginForm.setFeedback(error.message + '. please, repeat it')
        
        else if(error instanceof MatchError)
            loginForm.setFeedback('wrong credentials')

        else
            loginForm.setFeedback('sorry, there was an error, please try again later')
    }
})

var loginLink = new Link
loginLink.setText('Register')
loginLink.onClick(function(event) {
    event.preventDefault()

    setTimeout(function() {
        location.href = '../register'
    }, 1000)
})


view.add(title)
view.add(loginForm)
view.add(loginLink)

