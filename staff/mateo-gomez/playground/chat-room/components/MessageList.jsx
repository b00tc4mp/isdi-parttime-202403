//MÉTODO 1
/*function renderMessages(messages) {
    const lis = messages.map(message => <li>
        <h3>{message.username}</h3>
        <p>{message.text}</p>
        <time>{message.date}</time>
    </li>)

    const messageList = <ul>{lis}</ul>

    return messageList
}
*/

//MÉTODO 2
const { Component } = React
class MessageList extends Component {
    constructor() {
        super()

        console.log('MessageList -> constructor')
    }

    componentDidMount() { //method overriding
        console.log('MessageList -> componentDidMount')
    }

    componentDidUpdate() { //method overriding
        console.log('MessageList -> componentDidUpdate')
    }

    componentWillUnmount() { //method overriding
        console.log('MessageList -> componentWillUnmount')
    }

    componentWillReceiveProps(newProps, oldProps) { //method overriding
        console.log('MessageList -> componentWillReceiveProps')
    }


    render() {
        console.log('MessageList -> render')

        const { title, messages } = this.props

        return <section className='MessageList'>
            <h2 className="title">{title}</h2>

            <ul>{messages.map(message => <li>
                <h3>{message.username}</h3>
                <p>{message.text}</p>
                <time>{message.date}</time>
            </li>)}</ul>
        </section>
    }
}