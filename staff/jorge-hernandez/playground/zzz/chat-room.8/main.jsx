const rootElement = document.getElementById('root')

const root = ReactDOM.createRoot(rootElement)

const title = <h1>Chat-Room</h1>

const messages = [
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

//TODO NECESITO ENTENDER ESTO
root.render([title,<MessageList title={'Messages'} messages={messages}/>, <Counter />])
