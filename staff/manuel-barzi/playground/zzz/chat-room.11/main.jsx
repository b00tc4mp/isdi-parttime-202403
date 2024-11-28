const root = ReactDOM.createRoot(document.getElementById('root'))

const title = <h1>Chat Room</h1>

const messages = [
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

root.render([title, <MessageList title={'Messages'} messages={messages} />, <Counter />])