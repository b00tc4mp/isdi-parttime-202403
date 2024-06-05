import './App.css'
import { Component } from 'react'
import logic from './logic'
import './component/core/Button.css'
import './component/core/Field.css'
import './component/core/Form.css'
import './component/core/Heading.css'
// import './component/core/SumbitButton.css'
import './component/core/Link.css'
import './component/core/Label.css'
import './component/core/Input.css'
import './component/core/Image.css'
import './component/library/FormWithFeedback.css'

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

        console.log('user successfully logged in')
      })
    } catch (error) {
      // if (error instanceof ContentError)
      //   this.setFeedback(error.message + '. please, repeat it')

      // else if (error instanceof MatchError)
      //   this.setFeedback('wrong credentials')

      // else
      //   this.setFeedback('sorry, there was an error, please try again later')
      console.error(error)
    }
  }

  render() {
    return <main>
      <h1>SocialCode</h1>

      <form className="Form FormWithFeedback" onSubmit={this.handleSubmit}>
        <div className="Field">
          <label className="Label" htmlFor="username">Username</label>
          <input className="Input" id="username" type="text" />
        </div>
        <div className="Field">
          <label className="Label" htmlFor="password">Password</label>
          <input className="Input" id="password" type="password" />
        </div>
        <button className="Button SubmitButton" type="submit">Login</button>
      </form>
    </main>
  }
}

export default App
