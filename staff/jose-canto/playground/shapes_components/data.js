var data = {}

data.findUser = function (callback) {
  // Obtenemos los usuarios del Local Storage o creamos un array vacío si no existen
  var usersJson = localStorage.users

  if (!usersJson) { usersJson = "[]" }

  // Convertimos la cadena JSON de usuarios a un array de objetos
  var usersArray = JSON.parse(usersJson)

  var userRegistered = usersArray.some(callback)


  return userRegistered
}
