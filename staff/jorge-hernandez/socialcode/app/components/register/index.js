if (logic.isUserLoggedIn()) location.href = '../home'
const view = new Component(document.body)
view.addClass('View')
const registerForm = new RegisterForm()
view.add(registerForm)

//onclick password
const icon = document.getElementById('icon')
const passField = document.getElementById('password')
icon.onclick = () => {
  showPass(icon, passField, 'password', 'text')
}

const icon2 = document.getElementById('icon2')
const passField2 = document.getElementById('repeat-password')
icon2.onclick = () => {
  showPass(icon2, passField2, 'password', 'text')
}

registerForm.onSubmit((event) => {
  event.preventDefault()
  const email = registerForm.getEmail()
  const username = registerForm.getUsername()
  const password = registerForm.getPassword()
  const repeatPassword = registerForm.getRepeatPassword()

  try {
    logic.registerUser(email, username, password, repeatPassword)
  } catch (error) {
    if (error instanceof ContentError) {
      registerForm.setFeedback(error.message + ', corrígelo')
      setTimeout(() => {
        registerForm.setFeedback('')
      }, 2000)
    } else if (error instanceof MatchError) {
      registerForm.setFeedback('Error de credenciales')
      setTimeout(() => {
        registerForm.setFeedback('')
      }, 2000)
    } else if (error instanceof DuplicityError) {
      registerForm.setFeedback('usuario ya existe')
      setTimeout(() => {
        registerForm.setFeedback('')
      }, 2000)
    } else {
      registerForm.setFeedback(
        'Hay un error lo solucionaremos lo antes posible'
      )
    }
  }
})

const link = new Link()
link.setUrl('../login/index.html')
link.setTarget('_blank')
link.setText('Login')
view.add(link)
