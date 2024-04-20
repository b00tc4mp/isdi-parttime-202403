// Recuperar la información del nuevo usuario de localStorage
var newUser = localStorage.newUser ? JSON.parse(localStorage.newUser) : null

if (newUser) {
  console.log('Nuevo usuario:', newUser)
  // Haz algo con la información del nuevo usuario aquí
  var title = new Heading(1)
  title.setText('Hola ' + newUser.username)
} else {
  console.log('No se encontró información del nuevo usuario en localStorage')
}

document.body.appendChild(title.container)
