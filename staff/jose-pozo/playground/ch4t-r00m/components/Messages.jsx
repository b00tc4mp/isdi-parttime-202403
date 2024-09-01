const { Component } = React

class Messages extends Component {
    constructor() {
        super()

        this.state = {
            messages: [
                /*{
                    username: 'Jon Snow',
                    text: 'Blah',
                    date: new Date().toISOString()
                },
                {
                    username: 'Daenerys Targaryen',
                    text: 'Blah',
                    date: new Date().toISOString()
                },
                {
                    username: 'Tyrion Lannister',
                    text: 'Blah',
                    date: new Date().toISOString()
                }*/
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
            date: new Date().toString().slice(16, 24)
        }


        const messages = this.state.messages.concat(message)

        this.setState({ messages })
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