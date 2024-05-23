const { Component } = React

class Messages extends Component {
    constructor() {
        super()

        this.state = {
            messages: [
                {
                    username: 'Pollete',
                    text: 'El pollo es considerado un alimento ideal debido a su contenido en proteínas, bajo contenido en grasas y riqueza en nutrientes esenciales.',
                    date: new Date().toISOString()
                },
                {
                    username: 'Iñaki',
                    text: 'Que llames al pollo carne es insultante, una buena chuleta de vaca madurada... eso si es carne de verdad y no algo insipido.',
                    date: new Date().toISOString()
                },
                {
                    username: 'Pollete',
                    text: 'Cuando te vea no te va a dar tiempo a reaccionar, te voy a pegar un gancho con la derecha que vas a comer chuleta a sorbos.',
                    date: new Date().toISOString()
                },
                {
                    username: 'Ismael',
                    text: 'No pelien, que pareceis parientes cercanos del mono.',
                    date: new Date().toISOString()
                },
                {
                    username: 'Adrian',
                    text: 'Vaya panda de homosapiens, entre el pollo y el carnivoro no hacen uno.',
                    date: new Date().toISOString()
                }
            ]
        }
    }

    handleMessageSubmit = (event) => {
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
        return <div className="AllInputs">
            <MessageList title={'Messages Vertedero'} messages={this.state.messages} />

            <form className='Form' onSubmit={this.handleMessageSubmit}>
                <input className='Input' name="username" placeholder="username" />
                <input className='Input' name="text" placeholder="message" />
                <button className='Button' type="submit">Send</button>
            </form>
        </div>
    }
}