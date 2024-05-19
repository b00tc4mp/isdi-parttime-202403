const {Component} = React

class MessageList extends Component{
    constructor(){
        super()

    }

    render() {
        const { title, messages } = this.props

        return <section className="MessageList">
            <h2 className="title">{title}</h2>

            <ul>{messages.map(message => <li className="Li">
                <h3 className="Username">{message.username}</h3>
                <p className="Text">{message.text}</p>
                <time className="Date">{message.date}</time>
            </li>)}</ul>
        </section>
    }
}