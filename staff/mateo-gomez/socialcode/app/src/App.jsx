import './App.css'
import { Component } from 'react'
import logic from './logic'
import './components/core/Field.css'
import './components/core/Form.css'
import './components/core/Button.css'
import './components/core/Image.css'
import './components/core/Input.css'
import './components/core/SubmitButton.css'
import './components/library/FormWithFeedback.css'


class App extends Component {
  constructor() {
    super()
  }

  handleSubmit = event => {
    event.preventDefault()

    const form = event.target

    const username = form.username.value
    const password = form.password.value

    try {
      logic.loginUser(username, password, error => {
        if (error) {
          console.error(error.message + ', please, correct it')

          return
        }


        console.log('user successfully logged in', 'success')

      })


    } catch (error) {
      /* if (error instanceof ContentError)
         this.setFeedback(error.message + ', please, correct it')
       else if (error instanceof MatchError)
         this.setFeedback('wrong credentials')
       else
         this.setFeedback('sorry, there was an error, please try again later')
     }*/

      console.error(error)
    }
  }



  render() {
    return <main>
      <h1>Hello, App!</h1>

      <form className="Form FormWithFeedback" onSubmit={this.handleSubmit}>
        <div className="Field">
          <label htmlFor="username">Username</label>
          <input className="Input" id="username" type="text"></input>
        </div>
        <div className="Field">
          <label htmlFor="password">Password</label>
          <input className="Input" id="password" type="password"></input>
        </div>
        <button className="Button SubmitButton" type="submit">Login</button>
      </form>

    </main>
  }

}

export default App
