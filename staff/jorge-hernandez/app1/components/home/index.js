let newUser = localStorage.newUser ? JSON.parse(localStorage.newUser) : null
let title
if (newUser) {
  title = new Heading(1)
  title.setText('Welcome ' + newUser.username)
} else {
  title = new Heading(1)
  title.setText('Welcome')
}
const link = new Link()
link.setUrl('../login/index.html')
link.setText('Logout')
document.body.appendChild(title.container)
document.body.appendChild(link.container)
