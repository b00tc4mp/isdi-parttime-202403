const { Component } = React

class RegisterForm extends Component {
  constructor() {
    super()
  }

  render() {
    return <div>
      <form>

        <label htmlFor="username">Username:</label>
        <input id="username" placeholder="username" type="text"></input>

        <label htmlFor="password">Password:</label>
        <input id="password" placeholder="password" type="password" ></input>

        <button type="submit" >Register</button>
      </form>
    </div>
  }
}