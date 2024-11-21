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

    //definimos de nuevo el metodo setState propio de la classe para poder añadir el chivato
    setState(newState) { //method overriding, metodo que creas en la clase hija que ya existria en la clase padre
        console.log("Messages->setState")
        super.setState(newState)

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
            date: new Date().toISOString()
        }

        const messages = this.state.messages.concat(message)
        this.setState({ messages })

        form.reset()
    }

    componentDidMount() {//method overriding
        console.log("Messages->componentDidMount")

    }

    componentDidUpdate() {//method overriding
        console.log("Messages->componentDidUpdate")

    }

    componentWillUnmount() {//method overriding
        console.log("Messages->componentWillUnmount")

    }

    render() {
        console.log("Messages->render")
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

//TODO actualizar metodos react y funcion flecha
