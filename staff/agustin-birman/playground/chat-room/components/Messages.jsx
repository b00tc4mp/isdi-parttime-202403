const { Component } = React

class Messages extends Component {
    constructor() {
        super()

        console.log('Messages -> constructor')

        this.state = {
            messages: [
                {
                    username: 'pepitogrillo',
                    text: 'blah',
                    date: new Date().toISOString()
                },
                {
                    username: 'wendydarling',
                    text: 'blah blah',
                    date: new Date().toISOString()
                },
                {
                    username: 'peterpan',
                    text: 'blah blah blah',
                    date: new Date().toISOString()
                }
            ]
        }
    }

    setState(newState) {
        console.log('Message -> setState')

        super.setState(newState)
    }

    handleMessageSubmit = event => {
        event.preventDefault()

        console.log('Messages -> handleMessageSubmit')

        const form = event.target

        const username = form.username.value
        const text = form.text.value

        const message = {
            username,
            text,
            date: new Date().toISOString()
        }

        const messages = this.state.messages.concat(message)

        this.setState({ messages })

        form.reset()
    }

    componentDidMount() { // method overriding
        console.log('Messages -> componentDidMount')
    }

    componentDidUpdate() { // method overriding
        console.log('Messages -> componentDidUpdate')
    }

    componentWillUnmount() { // method overriding
        console.log('Messages -> componentWillUnmount')
    }

    componentWillReceiveProps(newProps, oldProps) { // method overriding
        console.log('Messages -> componentWillUnmount')
    }

    render() {
        console.log('Messages -> render')

        return <div>
            <MessageList title={'Messages'} messages={this.state.messages} />

            <form onSubmit={this.handleMessageSubmit}>
                <input name="username" placeholder="username" />
                <input name="text" placeholder="message" />
                <button type="submit">Send</button>
            </form>
        </div>
    }
}