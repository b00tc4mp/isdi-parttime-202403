const root = ReactDOM.createRoot(document.getElementById('root'))


const title = <h1>Chat Room</h1>

const messages = [
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