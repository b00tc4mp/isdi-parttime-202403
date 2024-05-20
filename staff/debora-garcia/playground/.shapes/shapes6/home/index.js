if (!logic.isUserLoggedIn())// si no ha hecho login no te deje acceder al juego
    location.href = "../login"

var view = new Component(document.body)
view.addClass("View")

var logoutButton = new Button
logoutButton.setText("Logout")
logoutButton.addClass("logoutButton")

logoutButton.onClick(function () {
    logic.logoutUser()

    location.href = "../login"
})

var userName= logic.getUserName()

var userNameTitle= new Heading(3)
userNameTitle.setText(userName)

view.add(userNameTitle)

view.add(logoutButton)


var koala = new Koala()

koala.setX(x)
koala.setY(y)

var x = 300
var y = 300
var step = 20

var doc = new Component(document)

doc.onKeyDown(function (event) {
    if (event.key === "ArrowLeft")
        x -= step
    else if (event.key === "ArrowRight")
        x += step
    else if (event.key === "ArrowUp")
        y -= step
    else if (event.key === "ArrowDown")
        y += step
    koala.setX(x)
    koala.setY(y)

})

setInterval(() => koala.setY(y + (Math.random() * (300 - 200) + 200)), 2000);
setInterval(() => koala.setX(x + (Math.random() * (300 - 200) + 200)), 2000)


//TODO revisar funcion forEach, revisar el cambio al añadir el component
/* koala.forEach(function(koala){
    document.body.appendChild(koala.container)

}) */

view.add(koala)

