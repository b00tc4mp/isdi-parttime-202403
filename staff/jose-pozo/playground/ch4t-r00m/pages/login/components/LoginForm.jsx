const { Component } = React

class LoginForm extends Component {
    constructor() {
        super()

        this.state = {
            users: []
        }
    }

    handleLoginSubmit(event) {
        event.preventDefault()

        const form = event.target

        const username = form.username.value

        const password = form.password.value

        const user = {
            username,
            password
        }


        const users = this.state.users.concat(user)

        this.setState({ users })

        console.log(users)
    }

    render() {
        return <div>
            <form className="LoginForm" onSubmit={this.handleLoginSubmit.bind(this)}>
                <label htmlFor="username">Username</label>
                <input name="username" placeholder="username" />
                <label htmlFor="password">Password</label>
                <input name="password" placeholder="password" />
                <button type="submit">Send</button>
            </form>
        </div>
    }
}