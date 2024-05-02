if (logic.isUserLoggedIn())
  location.href = '../home'

// Creamos una instancia de la clase Component y le pasamos el elemento body del documento como argumento
const view = new Component(document.body)
view.addClass("View")

const headerLogin = new Header(1)
headerLogin.setText("LOGIN")
headerLogin.addClass("HeaderLoginRegister")

const loginForm = new LoginComponent()
loginForm.onSubmit(event => {
  event.preventDefault()

  const username = loginForm.getUsername()

  const password = loginForm.getPassword()

  try {
    logic.loginUser(username, password)

    loginForm.clear()

    loginForm.setFeedback("User logged in ✅", "success")

    setTimeout(() => {
      location.href = '../home'
    }, 1000)

  } catch (error) {
    //alert(error.message)
    if (error instanceof ContentError) {
      loginForm.setFeedback(error.message + ", please, correct it ❌")

    } else if (error instanceof MatchError) {
      loginForm.setFeedback("❌ Wrong credentials ❌")

    } else {
      loginForm.setFeedback("Please try again later ⌛")
    }
    setTimeout(() => loginForm.clearFeedback(), 2000)
  }
})

const registerLink = new Link()
registerLink.setText("Register")
registerLink.setUrl("../register/index.html")
// registerLink.setTarget("_blank")

registerLink.onClick(event => {
  event.preventDefault()
  console.log("...en espera de 1 segundo ⌛")
  setTimeout(() => location.href = "../register", 1000)
})

view.add(headerLogin)
view.add(loginForm)
view.add(registerLink)

