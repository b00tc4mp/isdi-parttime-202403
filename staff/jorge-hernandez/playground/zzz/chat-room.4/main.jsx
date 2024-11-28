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


function renderMessages(messages){
    const lis = messages.map(message =>
        <li>
            <h3>{message.username}</h3>
            <p>{message.text}</p>
            <time>{message.date}</time>
        </li>
    )
    
    const messageList = <ul>{lis}</ul>

    return messageList
}

root.render([title,renderMessages(messages)])
