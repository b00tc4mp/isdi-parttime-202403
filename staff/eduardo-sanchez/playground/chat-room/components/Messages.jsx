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

// Sile quitasemos el bind al form estariamos enviando al submit una funcion como callback y esa funcion utiliza this, ese this se perderia.Al llmar a esa funcion como viene del DOM esta no tiene un contexto definido, el this se pierde y no va a encontrar al setState.Ademas cuando el this que se invoca esta dentro de otra funcion el this se pierde y da como resultado indefinido, ni siquiera apunta a windows x eso tengo q utilizar bind y pasarle this el cual tiene el contexto del propio componente.


{/* <form onSubmit={this.handleMessageSubmit}> */ }
// {/* form.addEventListener('submit', function() {...}) */}
// {/* form.addEventListener('submit', this.handleMessageSubmit.bind(this)) */}