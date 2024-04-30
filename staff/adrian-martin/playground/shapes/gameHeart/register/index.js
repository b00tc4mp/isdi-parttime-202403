var view = new Component(document.body)

view.addClass('View')

var title = new Heading(1)
title.setText('Register')
title.onClick(function() {
    alert('Remember, there will always be a better half for you.')
})


var registerForm = new RegisterForm
registerForm.onSubmit(function(event) {
    event.preventDefault()

    var email = registerForm.getEmail()
    var username = registerForm.getUsername()
    var password = registerForm.getPassword()
    var passwordRepeat = registerForm.getPasswordRepeat()

    try{
        logic.registerUser(email, username, password, passwordRepeat)

        registerForm.setFeedback('user successfully registered', 'success')
        
        registerForm.clear()

        setTimeout(function() {

            location.href = '../login'

        }, 2000)

    }catch (error) {
        if(error instanceof ContentError)
            registerForm.setFeedback(error.message + '. please, correct it')
        else if(error instanceof MatchError)
            registerForm.setFeedback(error.message + '. please, retype them')
        else if(error instanceof DuplicityError)
            registerForm.setFeedback(error.message + '. please, enter new one')
        else
            registerForm.setFeedback('sorry there was an error, please try again')
    } 
})

var registerLink = new Link
registerLink.setText('Login')
registerLink.onClick(function(event) {
    event.preventDefault()

    setTimeout(function() {
        location.href = '../login'
    }, 1000)
})

view.add(title)
view.add(registerForm)
view.add(registerLink)


    // separation Of Concents/three tear => Presentation/BusinessLogic/DataBase

    // JSON.parse(localStorage.users)


    // var view = new Component(document.body)

    // view.addClass('View')

    // var title = new Heading(1)
    // title.setText('Register')
    // title.onClick(function() {
    //     alert('Remember, there will always be a better half for you.')
    // })
    // // separation Of Concents/three tear => Presentation/BusinessLogic/DataBase
    // var registerForm = new RegisterForm
    // registerForm.onSubmit(function(event) {
    //     event.preventDefault()

    //     var email = registerForm.getEmail()
    //     var username = registerForm.getUsername()
    //     var password = registerForm.getPassword()
    //     var passwordRepeat = registerForm.getPasswordRepeat()


    // var usersJson = localStorage.users

    // if(!usersJson) usersJson = '[]'

    // var users = JSON.parse(usersJson)

    // var user = users.find(function(user) {
    //     return user.email === email || user.username === username
    // })

    // if(user)  {
    //     alert('user already exists')

    //     return
    // }

    // if(password !== passwordRepeat) {
    //     alert('password don\'t match')

    //     return
    // }

    // user = {
    //     email: email,
    //     username: username,
    //     password: password
    // }

    // users.push(user)

    // usersJson = JSON.stringify(users)

    // localStorage.users = usersJson

    //     registerForm.clear()
    //     // JSON.parse(localStorage.users)
    // })

    // var registerLink = new Link
    // registerLink.setText('Login')
    // registerLink.onClick(function(event) {
    //     event.preventDefault()

    //     setTimeout(function() {
    //         location.href = '../login'
    //     }, 1000)
    // })

    // view.add(title)
    // view.add(registerForm)
    // view.add(registerLink)

