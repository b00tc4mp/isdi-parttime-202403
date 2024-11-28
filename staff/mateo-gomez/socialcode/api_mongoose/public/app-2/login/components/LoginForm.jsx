const { Component } = React

class LoginForm extends Component {
    constructor() {
        super()
    }

    render() {
        return (<form>
            <label for="username"></label>
            <input name="username" type="text"></input>
            <label for="name"></label>
            <input name="name" type="text"></input>
            <label for="password"></label>
            <input name="password" type="text"></input>
        </form>)
    }
}