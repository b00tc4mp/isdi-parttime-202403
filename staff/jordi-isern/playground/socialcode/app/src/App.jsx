import { Component } from 'react'
import './App.css'
import logic from './logic'
import './global.css'
import './Components/Core/Form.css'
import './Components/Core/Field.css'
import './Components/Core/Button.css'
import './Components/Core/SubmitButton.css'
import './Components/Core/PasswordField.css'

class App extends Component {
  constructor(){
    super()
  }

  handleSubmit = event => {
    event.preventDefault()

    const form = event.targer

    const username = form.username.value
    const password = form.password.value

    try{
      logic.loginUser(username, password, error =>{
        if (error) {
          console.error( error.message +', please correct it')

          return
        }

        console.log('usern seccessfully logged in')
      })
    }catch (error) {
      // if (error instanceof ContentError)
      //   this.setFeedback(error.message + ', please, correct it')
      // else if (error instanceof MatchError)
      //   this.setFeedback('wrong credentials')
      // else
      //   this.setFeedback('sorry, there was an error, please try again later')
      console.error(error)
    }
  }
  render () {
    return <>
    {true &&    <main>
      <h1>Login</h1>
      <form class="Form FormWithFeedback LoginForm">
        <div class="FieldInput">
          <label>Username</label>
          <div class="divInput">
            <input class="Input input" id="username" type="text"/>
            </div>
          </div>
        <div class="FieldPassword">
          <div class="divLavel">
            <label>Password</label>
          </div>
          <div class="divInputPassword">
            <input class="Input input" id="password" type="password"/>
            <i class="lock fa-solid fa-lock" aria-hidden="true"></i>
          </div>
        </div>
        <button class="Button SubmitButton" type="submit">Login</button>
      </form>
      <a href="../register" class="Link registerLink">Register</a>
    </main>
  }
    </>
  }
}

export default App
