const root = ReactDOM.createRoot(document.getElementById('root'))


const title = <h1>Chat Room</h1>

const { Component } = React

class Counter extends Component {
    constructor() {
        super()

        this.state = { count: 0 }
    }

    handleCountClick() {
        this.setState({ count: this.state.count + 1 })
    }

    render() {
        return <section>
            <p>{this.state.count}</p>

            <button onClick={this.handleCountClick.bind(this)}>Count</button>
        </section>
    }
}

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

        // const input = form.text 

        // const text = input.value

        const text = form.text.value

        // console.log(username, text)

        const message = {
            username,
            text,
            date: new Date().toISOString()

        }
        // console.log(message)

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

root.render([title, <Counter />, <Messages />])