var logic = {}

var EMAIL_REGEX = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
var USERNAME_REGEX = /^[a-zA-Z0-9-_]+$/
var PASSWORD_REGEX = /^[a-zA-Z0-9-_$%&=\[\]\{\}\<\>\(\)]{4,}$/

logic.registerUser = function (email, username, password, passwordRepeat) {


  if (!EMAIL_REGEX.test(email)) { throw new Error("❌ Email is not valid ❌") }

  if (!USERNAME_REGEX.test(username)) { throw new Error("❌ Username is not valid ❌") }

  if (!PASSWORD_REGEX.test(password)) { throw new Error("❌ Password is not valid ❌") }

  //if (!PASSWORD_REGEX.test(passwordRepeat)) { throw new Error("❌ Password repeat is not valid ❌") }


  // Obtenemos los usuarios del Local Storage o creamos un array vacío si no existen
  var usersJson = localStorage.users

  if (!usersJson) { usersJson = "[]" }

  // Convertimos la cadena JSON de usuarios a un array de objetos
  var usersArray = JSON.parse(usersJson)

  var userRegistered = usersArray.some(function (user) {
    return user.email === email || user.username === username
  })

  if (userRegistered) {
    throw new Error("❌ Users already exists ❌")
  }

  if (password !== passwordRepeat) {

    throw new Error("❌ Password don't match ❌")
  }


  var user = {
    email: email,
    username: username,
    password: password,
    passwordRepeat: passwordRepeat
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
  setTimeout(function () {
    location.href = "../login"
  }, 2000)

}


logic.loginUser = function (username, password) {

  if (!USERNAME_REGEX.test(username)) { throw new Error("❌ Username is not valid ❌") } // Comprobamos si el usuario introduce correctamente los caracteres para no cargar con peticiones al servidor

  if (!PASSWORD_REGEX.test(password)) { throw new Error("❌ Password is not valid ❌") }

  var usersArray = JSON.parse(localStorage.users)

  var userFound = usersArray.some(function (user) {
    return user.username === username && user.password === password
  })

  if (!userFound) {
    //alert("❌Login incorrecto ❌")
    throw new Error("❌ Login incorrecto ❌")
  }
  setTimeout(function () {
    location.href = "../home/"
  }, 2000)

}