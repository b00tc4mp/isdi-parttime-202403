var logic = {}

var EMAIL_REGEX = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
var USERNAME_REGEX = /^[a-zA-Z0-9-_]+$/
var PASSWORD_REGEX = /^[a-zA-Z0-9-_$%&=\[\]\{\}\<\>\(\)]{4,}$/

logic.registerUser = function (email, username, password, passwordRepeat) {

  if (!EMAIL_REGEX.test(email)) {
    throw new ContentError("❌ Email is not valid ❌")
  }

  if (!USERNAME_REGEX.test(username)) {
    throw new ContentError("❌ Username is not valid ❌")
  }

  if (!PASSWORD_REGEX.test(password)) {
    throw new ContentError("❌ Password is not valid ❌")
  }

  if (password !== passwordRepeat) {
    throw new MatchError("❌ Password don't match ❌")
  }

  var userRegistered = data.findUser(function (user) {
    return user.email === email || user.username === username
  })

  if (userRegistered) {
    throw new DuplicityError("❌ Users already exists ❌")
  }

  var user = {
    email: email,
    username: username,
    password: password,
  }

  data.insertUser(user)
}

logic.loginUser = function (username, password) {

  if (!USERNAME_REGEX.test(username)) {
    throw new ContentError("❌ Username is not valid ❌")
  } // Comprobamos si el usuario introduce correctamente los caracteres para no cargar con peticiones al servidor

  if (!PASSWORD_REGEX.test(password)) {
    throw new ContentError("❌ Password is not valid ❌")
  }

  var userFound = data.findUser(function (user) {
    return user.username === username
  })

  if (!userFound) {
    //alert("❌Login incorrecto ❌")
    throw new MatchError("❌ User not found ❌")
  }
  if (userFound.password !== password) {
    throw new MatchError("❌ Wrong password ❌")
  }

  // TODO anything else?
}