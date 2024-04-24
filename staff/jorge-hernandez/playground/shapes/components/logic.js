var EMAIL_REGEX =
  /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
var USERNAME_REGEX = /^[a-zA-Z0-9-_]+$/
var PASSWORD_REGEX = /^[a-zA-Z0-9-_$%&=\[\]\{\}\<\>\(\)]{6,}$/

var logic = {}

logic.registerUser = function (email, username, password, repeatPassword) {
  if (!EMAIL_REGEX.test(email))
    throw new Error('Esta cuenta de correo no es correcta')

  if (!USERNAME_REGEX.test(username))
    throw new Error('nombre de usuario no válido')

  if (!PASSWORD_REGEX.test(password))
    throw new Error('La contraseña no cumple los criterios')

  if (password !== repeatPassword)
    throw new Error('los campos de contraseña no coinciden')

  var newUser = { email: email, username: username, password: password }

  var user = data.findUser(function (user) {
    return user.email === email || user.username === username
  })

  if (user) {
    throw new Error(
      'este email o nombre de usuario ya ha sido registrado anteriormente'
    )
  }

  data.insertUser(newUser)
}
