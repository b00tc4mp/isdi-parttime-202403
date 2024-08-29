const data = {}

data.findUser = (callback) => {
  // Obtenemos los usuarios del Local Storage o creamos un array vacío si no existen
  let usersJson = localStorage.users

  if (!usersJson) { usersJson = "[]" }

  // Convertimos la cadena JSON de usuarios a un array de objetos
  const users = JSON.parse(usersJson)

  const user = users.find(callback)

  return user
}

data.insertUser = (user) => {
    // Obtenemos los usuarios del Local Storage o creamos un array vacío si no existen
    let usersJson = localStorage.users
  
    if (!usersJson) { usersJson = "[]" }
  
    // Convertimos la cadena JSON de usuarios a un array de objetos
    const users = JSON.parse(usersJson)
  
    users.push(user)
  
    // Convertimos el array de usuarios de nuevo a una cadena JSON
    usersJson = JSON.stringify(users)
  
    // Guardamos la cadena JSON actualizada en el Local Storage
    localStorage.users = usersJson
  
  }