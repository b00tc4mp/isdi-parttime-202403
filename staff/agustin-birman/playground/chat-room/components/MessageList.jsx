const { Component } = React

class MessageList extends Component {
    constructor() {
        super()

        console.log('MessageList -> constructor')
    }

    componentDidMount() {
        console.log('MessageList -> constructor')
    }

    componentDidMount() {
        console.log('MessageList -> componentDidMount')
    }

    componentDidUpdate() {
        console.log('MessageList -> componentDidUpdate')
    }

    componentWillUnmount() {
        console.log('MessageList-> componentWillUnmount')
    }

    componentWillReceiveProps(newProps, oldProps) {
        console.log('MessageList -> componentWillReceiveProps')
    }

    render() {
        console.log('MessageList -> render')

        const { title, messages } = this.props

        return <section className="MessageList">
            <h2 className="title">{title}</h2>

            <ul>{messages.map(message => <li>
                <h3>{message.username}</h3>
                <p>{message.text}</p>
                <time>{message.date}</time>
            </li>)}</ul>
        </section>
    }

}

