if(logic.isUserLoggedIn())
location.href = '../home'

const view = new Component(document.body)
view.addClass('View')

const title = new Heading(1)
title.setText('Login')
title.onClick( () => {
    alert('Remember, there will always be a better half for you.')
})

const loginForm = new LoginForm

loginForm.onLoginSubmit((username, password) => {
    try{
        logic.loginUser(username, password)

        loginForm.clear()

        loginForm.setFeedback('user successfully logged in', 'success')

        setTimeout( () =>  location.href = '../home', 500)
        
    }catch(error){
        if (error instanceof ContentError) 
            loginForm.setFeedback(error.message + '. please, repeat it')
        
        else if(error instanceof MatchError)
            loginForm.setFeedback('wrong credentials')

        else
            loginForm.setFeedback('sorry, there was an error, please try again later')
    }
})

const loginLink = new Link
loginLink.setText('Register')
loginLink.onClick( event => {
    event.preventDefault()

    setTimeout( () =>  location.href = '../register' , 1000)
})


view.add(title)
view.add(loginForm)
view.add(loginLink)