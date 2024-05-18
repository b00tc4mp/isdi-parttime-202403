const { Component } = React

class Message extends Component {
    constructor(){
        super()

        this.state = {
            message: [
                {
                    username: 'Pollete',
                    title: 'Porque el pollo es el mejor animal',
                    text: 'El pollo es considerado un alimento ideal debido a su contenido en proteínas, bajo contenido en grasas y riqueza en nutrientes esenciales.',
                    date: new Date().toISOString()
                },
                {
                    username: 'Iñaki',
                    title: 'Pollete no tienes ni idea',
                    text: 'Que llames al pollo carne es insultante, una buena chuleta de vaca madurada... eso si es carne de verdad y no algo insipido.',
                    date: new Date().toISOString()
                },
                {
                    username: 'Pollete',
                    title: 'Te pisaba el cuello',
                    text: 'Cuando te vea no te va a dar tiempo a reaccionar, te voy a pegar un gancho con la derecha que vas a comer chuleta a sorbos.',
                    date: new Date().toISOString()
                },
                {
                    username: 'Ismael',
                    title: 'No se peleen señores',
                    text: 'Sean amigos y civilizados, que pareceis parientes cercanos del mono.',
                    date: new Date().toISOString()
                },
                {
                    username: 'Adrian',
                    title: 'Sois mas monos que los propios monos',
                    text: 'Vaya panda de homosapiens, entre el pollo y el carnivoro no hacen uno.',
                    date: new Date().toISOString()
                },
                {
                    username: 'Ismael',
                    title: 'Facto',
                    text: 'Hoy Adri te has levantado basado',
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
            title,
            text,
            date: new Date().toISOString() 
        }
    }

    render(){
        return <div>
            <MessageList title={'Messages'} messages={this.state.messages} />

            <form onSubmit={this.handleMessageSubmit}>
                <input name="username" placeholder="username" />
                <input name="text" placeholder="message" />
                <button type="submit">Send</button>
            </form>
        </div>
    }
}