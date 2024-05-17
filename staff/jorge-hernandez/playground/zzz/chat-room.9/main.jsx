const rootElement = document.getElementById('root')

const root = ReactDOM.createRoot(rootElement)

const title = <h1>Chat-Room</h1>

const {Component} = React

class Counter extends Component{
    constructor(){
        super()
        this.state = {count: 0}
    }

    handleCountClick(){
        this.setState({count: this.state.count +1})
    }
    render(){
        return <section>
            <p>{this.state.count}</p>
            <button onClick={this.handleCountClick.bind(this)}>Count</button>
        </section>
    }
}

class Messages extends Component{
    constructor(){
        super()
        this.state = {
            messages: [
                {
                    username: 'Jorge',
                    text: 'Hola Mundo',
                    date: new Date().toISOString()
                },
                {
                    username: 'Jorge',
                    text: 'Hola Mundo',
                    date: new Date().toISOString()
                }
            ]
        }
    }

    handleMessageSubmit(event){
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

root.render([title, <Counter />, <Messages />])