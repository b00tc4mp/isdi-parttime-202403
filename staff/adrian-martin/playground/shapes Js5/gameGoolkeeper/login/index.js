var view = new Component(document.body)
view.addClass('View')

var title = new Heading(1)
title.setText('Login')

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
            loginForm.clear()

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

var loginForm = new LoginForm()
var registerLink = new Link
registerLink.setText('Register')
registerLink.onClick(function (event) {
    event.preventDefault()

    setTimeout(function () {
        location.href = '../register'
    }, 500)
})

// var player1 = new PlayerLoginRegister()
// player1.setX(300)
// player1.setY(330)

// var player2 = new PlayerLoginRegister()
// player2.setColor('black')
// player2.setX(870)
// player2.setY(330)


// view.add(player2)
// view.add(player1)
view.add(title)
view.add(loginForm)
view.add(registerLink)


