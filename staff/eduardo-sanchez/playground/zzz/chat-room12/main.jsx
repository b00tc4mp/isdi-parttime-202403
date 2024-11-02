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

        const input = form.message //const input = form.querySelector('[name=message]')

        const message = input.value

        //const message = form.message.value

        console.log(message)
    }


    render() {
        return <div>
            <MessageList title={'Messages'} messages={this.state.messages} />


            <form onSubmit={this.handleMessageSubmit.bind(this)}>
                <input name="message" />
                <button type="submit">Send</button>

            </form>


        </div>
    }
}

root.render([title, <Counter />, <Messages />])