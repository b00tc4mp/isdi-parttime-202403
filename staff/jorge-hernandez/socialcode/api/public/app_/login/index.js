if (logic.isUserLoggedIn()) location.href = '../home'
const view = new Component(document.body)
view.addClass('View')

const logo = new Image()
// logo.alt('logo')
logo.setUrl('../src/logo.png')
logo.addClass('Logo')

const header = new Component('header')
view.add(header)
const headerTitle = new Component('h1')
headerTitle.setText('ocialCode')
header.add(logo)
header.add(headerTitle)

const loginForm = new LoginForm()
view.add(loginForm)
let linkCreated = false

loginForm.onLoggedIn(() => setTimeout(() => location.href = '../home', 1000))


//onclick password
const icon = document.getElementById('icon')
const passField = document.getElementById('password')

icon.onclick = () => {
  showPass(icon, passField, 'password', 'text')
}

const link = new Link()
link.setUrl('../register/index.html')
link.setTarget('_blank')
link.setText('Register')
view.add(link)
