class Messages extends Component {
    constructor() {
        super()

        this.state = {
            messages: [
                {
                    username: "RotoJaz",
                    text: "I'm hungry!",
                    date: new Date().toISOString(),
                },
                {
                    username: "ShellyBeach",
                    text: "Sleepy zZZz",
                    date: new Date().toISOString(),
                },
                {
                    username: "LionLeo",
                    text: "Thirsty",
                    date: new Date().toISOString(),
                }
            ]
        }

    }

    handleMessagesSubmit(event) {
        event.preventDefault()

        //te permite llegar al elemento html del DOM, en este caso al formulario original (input)
        const form = event.target
        const input = form.text
        const text = input.value
        const username = form.username.value

        const message = {
            username,
            text,
            date: new Date().toISOString
        }

        const messages = this.state.messages.concat(message)
        this.setState({ messages })

        form.reset()
    }
    render() {
        return <div>
            <MessageList title={"Messages"} messages={this.state.messages} />

            <form onSubmit={this.handleMessagesSubmit.bind(this)}>
                <input name="username" placeholder="username" />
                <input name="text" placeholder="username" />
                <button type="submit">Send</button>
            </form>
        </div>
    }
}