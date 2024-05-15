class Messages extends Component {
    constructor() {
        super()


        console.log('Messages -> constructor')
        this.state = {
            messages: [
                {
                    username: 'pepitogrillo',
                    text: 'klk',
                    date: new Date().toISOString()
                },
                {
                    username: 'lebronjames',
                    text: 'nba playoffs',
                    date: new Date().toISOString()
                },
                {
                    username: 'homersimpson',
                    text: 'me voy al bar',
                    date: new Date().toISOString()
                }
            ]
        }
    }

    setState(newState) { //method overriding
        console.log('Message -> setState')

        super.setState(newState)
    }

    handleMessageSubmit = event => {
        event.preventDefault()

        console.log('Messages -> handleMessageSubmit')

        const form = event.target

        const username = form.username.value


        const input = form.text
        const text = input.value
        //const text = form.text.value

        const message = {
            username,
            text,
            date: new Date().toISOString()
        }
        const messages = this.state.messages.concat(message)

        this.setState({ messages })

        form.reset()
    }

    componentDidMount() { //method overriding
        console.log('Message -> componentDidMount')
    }

    componentDidUpdate() { //method overriding
        console.log('Message -> componentDidUpdate')
    }

    componentWillUnmount() { //method overriding
        console.log('Message -> componentWillUnmount')
    }

    componentWillReceiveProps(newProps, oldProps) { //method overriding
        console.log('Message -> componentWillReceiveProps')
    }


    render() {

        console.log('Messagge -> render')
        return <div>
            <MessageList title={'Messages'} messages={this.state.messages} />
            {/*<form onSubmit={this.handleMessageSubmit.bind(this)}>*/} {/*Esto es lo mismo que abajo*/}
            <form onSubmit={this.handleMessageSubmit}>
                <input name='username' placeholder='username'></input>
                <input name='text' placeholder='message'></input>
                <button type='submit'>Send</button>
            </form>
        </div>
    }
}