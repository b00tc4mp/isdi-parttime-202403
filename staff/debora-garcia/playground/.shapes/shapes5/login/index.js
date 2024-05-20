var view = new Component(document.body)

view.addClass("View")

/* var title=new Heading(1)
title.setText("Login") */

var loginForm=new LoginForm
//var loginForm2= new LoginForm

var registerLink= new Link
registerLink.setText("Register")
//registerLink.setTarget("_blank")

registerLink.onClick(function (event) {
    event.preventDefault()
    console.log("controlado por JS")
    setTimeout(function () {
        location.href = "../register"
    },1000)
})

view.add(loginForm)
view.add(registerLink)
//view.add(loginForm2)