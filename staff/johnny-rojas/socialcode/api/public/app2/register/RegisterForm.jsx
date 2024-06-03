const { Component } = React

class RegisterForm extends Component {
  constructor() {
    super()

    this.state = {
      username: "",
      password: ""
    }
  }

  handleChange = (event) => {
    const id = event.target.id
    const value = event.target.value

    this.setState({ [id]: value })
  }

  handleSubmit = (event) => {
    event.preventDefault()

    // const username = this.state.username
    // const password = this.state.password

    const { username, password } = this.state  //Desestructuring

    try {
      logic.registerUser(username, password, (error) => {
        if (error) {
          alert(error.message)

          return
        }
        console.log('User registered')
      })

    } catch (error) {
      alert(error.message)

      return
    }
  }


  render() {
    return <div>
      <form onSubmit={this.handleSubmit}>

        <label htmlFor="username">Username:</label>
        <input id="username" placeholder="username" type="text" onChange={this.handleChange}></input>

        <label htmlFor="password">Password:</label>
        <input id="password" placeholder="password" type="password" onChange={this.handleChange}></input>

        <button type="submit" >Register</button>
      </form>
    </div>
  }
}