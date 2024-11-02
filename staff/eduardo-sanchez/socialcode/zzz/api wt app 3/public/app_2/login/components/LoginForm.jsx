const { Component } = React

class LoginForm extends Component {
    constructor() {
        super()

    }

    render() {
        return (<form>
            <label htmlFor="username">username</label>
            <input type="text" id="username"></input>

            <label htmlFor="password">password</label>
            <input type="text" id="password"></input>
        </form>)
    }

}