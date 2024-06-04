import React, { Component } from 'react'
import './App.css'
import logic from './logic.js'
import './components/core/Button.css'
import './components/core/Field.css'
import './components/core/LoginForm.css'
class App extends Component {
  constructor() {
    super()
  }

  handleSubmit = (event) => {
    event.preventDefault()

    const form = event.target

    const username = form.username.value
    const password = form.password.value

    try {
      logic.loginUser(username, password, (error) => {
        if (error) {
          console.error(error.message + ', please, correct it')

          return
        }

        console.log('user successfully logged in')
      })
    } catch (error) {
      // if (error instanceof ContentError)
      //   this.setFeedback(error.message + ', please, correct it')
      // else if (error instanceof MatchError)
      //   this.setFeedback('wrong credentials')
      // else
      //   this.setFeedback('sorry, there was an error, please try again later')
      console.error(error)
    }
  }

  render() {
    return (
      <main>
        <form
          className='Form FormWithFeedback LoginForm'
          onSubmit={this.handleSubmit}
        >
          <h1>Login</h1>
          <div className='Field'>
            <label>Username</label>
            <input id='username' type='text' placeholder='name'></input>
          </div>
          <div className='Field'>
            <label>Password</label>
            <input id='password' type='password' placeholder='password'></input>
          </div>
          <i
            id='icon'
            className='fa-regular fa-eye-slash icon'
            aria-hidden='true'
          ></i>
          <button className='Button' type='submit'>
            Login
          </button>
        </form>
      </main>
    )
  }
}

export default App
