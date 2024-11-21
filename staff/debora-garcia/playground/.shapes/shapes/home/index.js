if (!logic.isUserLoggedIn())// si no ha hecho login no te deje acceder al juego
    location.href = "../login"

const view = new Component(document.body)
view.addClass("View")

const logoutButton = new Button
logoutButton.setText("Logout")
logoutButton.addClass("logoutButton")

logoutButton.onClick(() => {
    logic.logoutUser()

    location.href = "../login"
})

const userName = logic.getUserName()

const userNameTitle = new Heading(3)
userNameTitle.setText(userName)

view.add(userNameTitle)

view.add(logoutButton)


const koala = new Koala()
let x = 300
let y = 300
let step = 20

koala.setX(x)
koala.setY(y)


const doc = new Component(document)

doc.onKeyDown(event => {
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

