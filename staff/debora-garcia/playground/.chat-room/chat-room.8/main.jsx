const root = ReactDOM.createRoot(document.getElementById("root"))

const title = <h1>Chat Room</h1>

// compo react inteligente

const { Component } = React

class Counter extends Component {
    constructor() {
        super()

        //propiedad del constructor  que te permite saber el estado del componente
        this.state = { count: 0 }
    }

    handelCountClick() {
        this.setState({ count: this.state.count + 1 })
        //se tiene que pasar las nuevas propiedades del objeto  para actualizar el estado de un objeto
        // en react al detectar un estado actualizado se da la orden de pintar de nuevo de forma asincrona 
    }

    render() {
        return <section>
            <p>{this.state.count}</p>
            {/* le estamos pasando el objecto en memoria de la funcion handelCountClick() que referenciada por esta propiedad */}
            <button onClick={this.handelCountClick.bind(this)}>Count</button>
            {/* bind envuelve la funcion dentro de otra usando el contexto de la funcion a la queremos referenciar */}
        </section>

        //react guarda memoria de un componente que mantiene el estado (compo inteligente)
    }

}


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

// el metodo de la classe es un callback del onClick (callback listener )


const helloButton = <button onClick={() => alert("hola")}> Hello</button>


root.render([title, helloButton, <Counter />, <Messages />])



