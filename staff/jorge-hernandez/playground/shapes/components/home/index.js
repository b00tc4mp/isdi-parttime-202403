var newUser = localStorage.newUser ? JSON.parse(localStorage.newUser) : null

if (newUser) {
  var title = new Heading(1)
  title.setText('Welcome ' + newUser.username)
} else {
  var title = new Heading(1)
  title.setText('Welcome')
}
var link = new Link()
link.setUrl('../login/index.html')
link.setText('Logout')
document.body.appendChild(title.container)
document.body.appendChild(link.container)
