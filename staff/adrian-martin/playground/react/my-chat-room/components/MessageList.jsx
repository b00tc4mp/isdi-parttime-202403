const {Component} = React

class MessageList extends Component{
    constructor(){
        super()
    }

    render() {
        const { username, messages } = this.props

        return <section className="MessageList">
            <h2 className="username">{username}</h2>

            <ul>{messages.map(message => <li>
                <h3>{message.title}</h3>
                <p>{message.text}</p>
                <time>{message.date}</time>
            </li>)}</ul>

        </section>
    }
}