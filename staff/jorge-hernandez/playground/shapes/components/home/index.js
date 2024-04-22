var newUser = localStorage.newUser ? JSON.parse(localStorage.newUser) : null

if (newUser) {
  console.log('Nuevo usuario:', newUser)
  var title = new Heading(1)
  title.setText('Hola ' + newUser.username)
} else {
  console.log('No se encontró información del nuevo usuario en localStorage')
}
var link = new Link()
link.setUrl('../login/index.html')
link.setText('Logout')
document.body.appendChild(title.container)
document.body.appendChild(link.container)
