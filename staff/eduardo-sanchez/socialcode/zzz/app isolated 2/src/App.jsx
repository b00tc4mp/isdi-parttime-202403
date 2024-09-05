import './App.css'
import logic from './logic'
import './components/core/Form.css'
import './components/core/Field.css'
import './components/core/Input.css'
import './components/core/Button.css'
import './components/core/SubmitButton.css'
import './components/library/FormWithFeedback.css'
import './App.css'
import { useState } from 'react'


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
        <div className="Field">
          <label htmlFor="name">Name</label>
          <input className="Input" id="name" type="text" placeholder="name" />
        </div>

        <div className="Field">
          <label htmlFor="surname">Surname</label>
          <input className="Input" id="surname" type="text" placeholder="surname" />
        </div>

        <div className="Field">
          <label htmlFor="email">E-mail</label>
          <input className="Input" id="email" type="email" placeholder="name@example.com" />
        </div>

        <div className="Field">
          <label htmlFor="username">Username</label>
          <input className="Input" id="username" type="text" placeholder="username" />
        </div>

        <div className="Field">
          <label htmlFor="password">Password</label>
          <input className="Input" id="password" type="password" placeholder="password" />
        </div>

        <div className="Field">
          <label htmlFor="password">Password repeat</label>
          <input className="Input" id="passwordRepeat" type="password" placeholder="repeat password" />
        </div>

        <button className="Button SubmitButton" type="submit">Register</button>
      </form>

      <a href="" onClick={handleLoginClick}>Login</a>

    </main>}

    {view === 'login' && <main className="View">
      <h1>Login</h1>

      <form className="Form FormWithFeedback" onSubmit={handleLoginSubmit}>
        <div className="Field">
          <label htmlFor="username">Username</label>
          <input className="Input" id="username" type="text" />
        </div>
        <div className="Field">
          <label htmlFor="password">Password</label>
          <input className="Input" id="password" type="password" />
        </div>
        <button className="Button SubmitButton" type="submit">Login</button>
      </form>

      <a href="" onClick={handleRegisterClick}>Register</a>
    </main>}

    {view === 'home' && <main className="View">
      <h1>Hello, Home!</h1>
    </main>}
  </>
}

export default App
