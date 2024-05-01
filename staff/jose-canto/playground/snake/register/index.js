var view = new Component(document.body)
view.addClass("View")

// H1
var header = new Header(1)
header.setText("REGISTER SNAKE 🐍")

header.onClick(function () {
  alert("BOOOOOM....💣💣💣")
})

// FORM
var registerForm = new RegisterComponent()

// Escuchamos el evento submit del formulario de registro
registerForm.onSubmit(function (event) {
  event.preventDefault() // Prevenimos el comportamiento predeterminado del formulario

  // Obtenemos los datos del formulario de registro
  var email = registerForm.getEmail()
  var username = registerForm.getUsername()
  var password = registerForm.getPassword()
  var passwordRepeat = registerForm.getPasswordRepeat()

  // Obtenemos los usuarios del Local Storage o creamos un array vacío si no existen
  var usersJson = localStorage.users

  if (!usersJson) {
    usersJson = '[]'
  }

  // Convertimos la cadena JSON de usuarios a un array de objetos
  var usersArray = JSON.parse(usersJson)

  var emailRegistered = usersArray.find(function (user) {
    return user.email === email
  })
  var userRegistered = usersArray.find(function (user) {
    return user.username === username
  })

  if (emailRegistered && userRegistered) {
    alert(`El email ${email} y el nombre de usuario ${username} ya están en uso ❌❌`)

  } else if (emailRegistered) {
    alert(`El email ${email} ya esta en uso ❌`)

  } else if (userRegistered) {
    alert(`El nombre de usuario ${username} ya está en uso ❌`)

  } else if (password !== passwordRepeat) {
    alert(`Password no coincide ❌`)

  } else {
    alert(`Usuario ${username} creado ✅`)

    // Creamos un objeto con los datos del nuevo usuario
    var user = {
      email: email,
      username: username,
      password: password,
    }
    usersArray.push(user)
    console.log(usersArray)

    // Convertimos el array de usuarios de nuevo a una cadena JSON
    var updatedUsersJson = JSON.stringify(usersArray)

    // Guardamos la cadena JSON actualizada en el Local Storage
    localStorage.users = updatedUsersJson
    console.log(localStorage.users)

    // Limpiamos el formulario de registro
    registerForm.clear()
    location.href = "../login" // Redireccionamos al usuario al inicio de sesión 
  }
})


// Login Link
var loginLink = new Link()
loginLink.setText("Login")
loginLink.onClick(function (event) {
  event.preventDefault()

  console.log("...en espera de 1 segundo para acceder al login")
  setTimeout(function () {

    location.href = "../login"

  }, 1000)
})

// ADD ELEMENT AT PRINCIPAL COMPONENT
view.add(header)
view.add(registerForm)
view.add(loginLink)


