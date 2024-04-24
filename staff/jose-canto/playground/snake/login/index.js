var view = new Component(document.body)
view.addClass("View")

var header = new Header(1)
header.setText("LOGIN SNAKE 🐍")

header.onClick(function () {
  alert("Kabooomm........💥💥")
})

var loginForm = new LoginComponent()

loginForm.onSubmit(function (event) {
  event.preventDefault()

  var username = loginForm.getUsername()
  console.log("user: " + username)
  var password = loginForm.getPassword()
  console.log("Password:" + password)

  var usersArray = JSON.parse(localStorage.users)
  console.log("Usuarios: ", usersArray)

  var userFound = false
  usersArray.forEach(function (user) {
    if (user.username === username && user.password === password) {
      userFound = true
    }
  })

  if (userFound) {
    alert("Login correcto ✔")
    loginForm.clear()
    location.href = "../home/"

  } else {
    alert("Login incorrecto ❌")
  }
})

var registerLink = new Link()
registerLink.setText("Register")
registerLink.onClick(function (event) {
  event.preventDefault()

  console.log("...en espera de 1 segundo para acceder al registro")
  setTimeout(function () {
    event.preventDefault()

    location.href = "../register"
  }, 1000)
})


view.add(header)
view.add(loginForm)
view.add(registerLink)
