class Messages extends Component {
    constructor() {
        super()

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

    handleMessageSubmit(event) {
        event.preventDefault()



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

    render() {
        return <div>
            <MessageList title={'Messages'} messages={this.state.messages} />
            <form onSubmit={this.handleMessageSubmit.bind(this)}>
                <input name='username' placeholder='username'></input>
                <input name='text' placeholder='message'></input>
                <button type='submit'>Send</button>
            </form>
        </div>
    }
}