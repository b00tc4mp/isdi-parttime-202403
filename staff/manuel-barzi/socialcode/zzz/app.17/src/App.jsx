import './App.css'
import logic from './logic'
import './components/core/Form.css'
import './components/core/Field.css'
import './components/core/Label.css'
import './components/core/Input.css'
import './components/core/Button.css'
import './components/core/SubmitButton.css'
import './components/library/FormWithFeedback.css'
import './App.css'
import { useState } from 'react'
import Field from './components/core/Field'
import SubmitButton from './components/core/SubmitButton'


function App() {
  console.log('App -> virtual dom')

  const [view, setView] = useState('login')

  const handleRegisterSubmit = event => {
    event.preventDefault()

    const form = event.target

    const name = form.name.value
    const surname = form.surname.value
    const email = form.email.value
    const username = form.username.value
    const password = form.password.value
    const passwordRepeat = form.passwordRepeat.value

    try {
      logic.registerUser(name, surname, email, username, password, passwordRepeat, error => {
        if (error) {
          console.log(error)

          alert(error.message)

          return
        }

        setView('login')
      })
    } catch (error) {
      console.error(error)

      alert(error.message)
    }
  }

  const handleLoginClick = event => {
    event.preventDefault()

    setView('login')
  }

  const handleLoginSubmit = event => {
    event.preventDefault()

    const form = event.target

    const username = form.username.value
    const password = form.password.value

    try {
      logic.loginUser(username, password, error => {
        if (error) {
          console.log(error)

          alert(error.message)

          return
        }

        setView('home')
      })
    } catch (error) {
      console.log(error)

      alert(error.message)
    }
  }

  const handleRegisterClick = event => {
    event.preventDefault()

    setView('register')
  }

  return <>
    {view === 'register' && <main className="View">
      <h1>Register</h1>

      <form className="Form FormWithFeedback RegisterForm" onSubmit={handleRegisterSubmit}>
        <Field id="name" placeholder="name">Name</Field>

        <Field id="surname" placeholder="surname">Surname</Field>

        <Field id="email" type="email" placeholder="name@example.com">E-mail</Field>

        <Field id="username" placeholder="username">Username</Field>

        <Field id="password" type="password" placeholder="password">Password</Field>

        <Field id="passwordRepeat" type="password" placeholder="password repeat">Password Repeat</Field>

        <button className="Button SubmitButton" type="submit">Register</button>
      </form>

      <a href="" onClick={handleLoginClick}>Login</a>
    </main>}

    {view === 'login' && <main className="View">
      <h1>Login</h1>

      <form className="Form FormWithFeedback" onSubmit={handleLoginSubmit}>
        <Field id="username" placeholder="username">Username</Field>

        <Field id="password" type="password" placeholder="password">Password</Field>

        <SubmitButton>Login</SubmitButton>
      </form>

      <a href="" onClick={handleRegisterClick}>Register</a>
    </main>}

    {view === 'home' && <main className="View">
      <h1>Hello, Home!</h1>
    </main>}
  </>
}

export default App
