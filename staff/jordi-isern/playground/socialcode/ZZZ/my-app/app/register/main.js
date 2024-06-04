if(logic.isUserLoggedIn()){
    location.href=' ../home'
}

const view = new Component(document.body) 
view.addClass('View')

const title = new Heading(1)
title.setText('Register')

const registerForm = new RegisterForm

registerForm.onSubmit(function(event){
    event.preventDefault()

    const name = registerForm.getName()
    const username = registerForm.getUserName()
    const email = registerForm.getMail()
    const password = registerForm.getPassword()
    const confirmPassword = registerForm.getConfirmPassword()

    try{
        logic.registerUser(name, username, email, password, confirmPassword)

        registerForm.clear()

        registerForm.setFeedback('User successfullt registred', 'success')
    
        setTimeout(function(){
            location.href = '../login'
        },700)
    } catch(error){
        if (error instanceof ContentError){
            registerForm.setFeedback(error.message +', please, correct it')
        }else if (error instanceof MatchError){
            registerForm.setFeedback(error.message +', please, retype them')
        }else if(error instanceof DuplicityError){
            registerForm.setFeedback(error.message + ', please, enter new one')
        }else{
            registerForm.setFeedback('sorry, there was an error, please try again later')
        }
    }
})

const loginLink = new Link
loginLink.setUrl('../login')
loginLink.setText('Login')
loginLink.addClass('loginLink')

view.add(title)
view.add(registerForm)
view.add(loginLink)


