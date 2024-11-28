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

//TODO NECESITO ENTENDER ESTO
root.render([title,<MessageList title={'Messages'} messages={messages}/>])
