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


function MessageList(props){

    const {title, messages} = props

    // const lis = messages.map(message =>
    //     <li>
    //         <h3>{message.username}</h3>
    //         <p>{message.text}</p>
    //         <time>{message.date}</time>
    //     </li>
    // )
    
    // const messageList = <ul>{lis}</ul>

    return [<h2>{title}</h2>, <ul>{messages.map(message =>
        <li>
            <h3>{message.username}</h3>
            <p>{message.text}</p>
            <time>{message.date}</time>
        </li>
    )}</ul>] 
}
//TODO NECESITO ENTENDER ESTO
root.render([title,<MessageList title={'Messages'} messages={messages}/>])
