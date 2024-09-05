import logic from './logic'
import './components/library/FormWithFeedback.css'
import { useState } from 'react'
import Field from './components/core/Field'
import SubmitButton from './components/core/SubmitButton'
import FormWithFeedback from './components/library/FormWithFeedback'
import Link from './components/core/Link'
import Title from './components/core/Title'
import View from './components/library/View'

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
    {view === 'register' && <View tag="main">
      <Title>Register</Title>

      <FormWithFeedback onSubmit={handleRegisterSubmit}>
        <Field id="name" placeholder="name">Name</Field>

        <Field id="surname" placeholder="surname">Surname</Field>

        <Field id="email" type="email" placeholder="name@example.com">E-mail</Field>

        <Field id="username" placeholder="username">Username</Field>

        <Field id="password" type="password" placeholder="password">Password</Field>

        <Field id="passwordRepeat" type="password" placeholder="password repeat">Password Repeat</Field>

        <SubmitButton>Register</SubmitButton>
      </FormWithFeedback>

      <Link onClick={handleLoginClick}>Login</Link>
    </View>}

    {view === 'login' && <View tag="main">
      <Title>Login</Title>

      <FormWithFeedback onSubmit={handleLoginSubmit}>
        <Field id="username" placeholder="username">Username</Field>

        <Field id="password" type="password" placeholder="password">Password</Field>

        <SubmitButton>Login</SubmitButton>
      </FormWithFeedback>

      <Link onClick={handleRegisterClick}>Register</Link>
    </View>}

    {view === 'home' && <View>
      <header></header>

      <View tag="main">
        <Title>Hello, Home!</Title>
      </View>

      <footer></footer>
    </View>}
  </>
}

export default App