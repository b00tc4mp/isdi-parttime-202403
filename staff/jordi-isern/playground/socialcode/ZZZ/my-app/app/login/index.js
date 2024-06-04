if(logic.isUserLoggedIn()){
    location.href=' ../home'
}

const view = new Component(document.body)
view.addClass('View')

const title = new Heading(1)
title.setText('Login')

const loginForm = new LoginForm

loginForm.onSubmit((event) => {
    event.preventDefault()

    const usersJson = localStorage.users
    const users = JSON.parse(usersJson)
    const userInput = loginForm.getUsername()
    var passwordInput = loginForm.getPassword()
    try{
        logic.loginUser(userInput, passwordInput)

        sessionStorage.username = userInput

        location.href = '../home'
    }catch(error){
        if(error instanceof MatchError ){
        loginForm.setFeedback(error.message)
        }else{
            loginForm.setFeedback('sorry, there was an error, please try again later')
        }
    }

})    
var registerLink = new Link
registerLink.setText('Register')
registerLink.setUrl('../register')
registerLink.addClass('registerLink')


view.add(title)
view.add(loginForm)
view.add(registerLink)


