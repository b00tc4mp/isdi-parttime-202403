const logic = {}

const EMAIL_REGEX = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
const USERNAME_REGEX = /^[a-zA-Z0-9-_]+$/
const PASSWORD_REGEX = /^[a-zA-Z0-9-_$%&=\[\]\{\}\<\>\(\)]{4,}$/

const NAME_REGEX = /^[a-zA-Z=\[\]\{\}\<\>\(\)]{1,}$/

logic.registerUser = (name, surname, email, username, password, passwordRepeat) => {
  if (!NAME_REGEX.test(name))
    throw new ContentError('❌ name is not valid ❌')

  if (!NAME_REGEX.test(surname))
    throw new ContentError('❌ surname is not valid ❌')

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

  let userRegistered = data.findUser(function (user) {
    return user.email === email || user.username === username
  })

  if (userRegistered) {
    throw new DuplicityError("❌ Users already exists ❌")
  }

  const user = {
    name: name,
    surname: surname,
    email: email,
    username: username,
    password: password,
  }

  data.insertUser(user)
}

logic.loginUser = (username, password) => {

  if (!USERNAME_REGEX.test(username)) {
    throw new ContentError("❌ Username is not valid ❌")
  } // Comprobamos si el usuario introduce correctamente los caracteres para no cargar con peticiones al servidor

  if (!PASSWORD_REGEX.test(password)) {
    throw new ContentError("❌ Password is not valid ❌")
  }

  let userFound = data.findUser((user) => user.username === username)

  if (!userFound) {
    //alert("❌Login incorrecto ❌")
    throw new MatchError("❌ User not found ❌")
  }
  if (userFound.password !== password) {
    throw new MatchError("❌ Wrong password ❌")
  }
  sessionStorage.username = username
}

logic.isUserLoggedIn = function () {
  // if (sessionStorage.username)
  //     return true

  // return false

  // return sessionStorage.username ? true : false

  return !!sessionStorage.username
}

logic.logetUser = function () {
  delete sessionStorage.username
}

logic.getName = function () {
  let user = data.findUser(function (user) {
    return user.username === sessionStorage.username
  })

  return user.name
}

logic.getUserName = function () {
  let user = data.findUser(function (user) {
    return user.username === sessionStorage.username
  })

  return user.username
}



logic.logoutUser = function () {
  delete sessionStorage.username
}
