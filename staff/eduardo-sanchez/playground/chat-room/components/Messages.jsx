const { Component } = React

class Messages extends Component {
    constructor() {
        super()

        this.state = {

            messages: [
                {
                    username: "manoloescobar",
                    text: "mi carro",
                    date: new Date().toISOString()
                },
                {
                    username: "lolaflores",
                    text: "pena penita",
                    date: new Date().toISOString()
                },
                {
                    username: "peterpan",
                    text: "tinkerbell",
                    date: new Date().toISOString()
                }
            ]
        }
    }

    handleMessageSubmit(event) {
        event.preventDefault()

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


    render() {
        return <div>
            <MessageList title={'Messages'} messages={this.state.messages} />


            <form onSubmit={this.handleMessageSubmit.bind(this)}>
                <input name="username" placeholder="username" />
                <input name="text" placeholder="message" />
                <button type="submit">Send</button>

            </form>


        </div>
    }
}