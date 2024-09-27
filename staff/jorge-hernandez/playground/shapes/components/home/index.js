if (!logic.isUserLoggedIn()) {
  location.href = '../login'
}
// var newUser = localStorage.newUser ? JSON.parse(localStorage.newUser) : null

if (sessionStorage.username) {
  var title = new Heading(1)
  title.setText('Welcome ' + sessionStorage.username)
} else {
  var title = new Heading(1)
  title.setText('Welcome')
}
var logout = new Button()
// link.setUrl('../login/index.html')
logout.setText('Logout')
document.body.appendChild(title.container)
document.body.appendChild(logout.container)
logout.onClick(() => {
  sessionStorage.clear()
  location.href = '../login'
  console.log('sesion eliminada')
})
