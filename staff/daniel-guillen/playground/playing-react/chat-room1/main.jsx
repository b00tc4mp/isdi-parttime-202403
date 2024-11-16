const rootElement = document.getElementById('root')

const root = ReactDOM.createRoot(rootElement)

const title = <h1>Chat Room</h1>

const messages = [
    {
        username: 'pepitogrillo',
        text: 'blah',
        date: new Date().toISOString()
    },
    {
        username: 'wendydarling',
        text: 'blah blah',
        date: new Date().toISOString()
    },
    {
        username: 'peterpan',
        text: 'blah blah blah',
        date: new Date().toISOString()
    }
]

function MessageList({ title, messages }) {
    return <>
        <h2 style={{ color: 'red', backgroundColor: 'yellow' }}>{title}</h2>

        <ul>{messages.map(message => <li>
            <h3>{message.username}</h3>
            <p>{message.text}</p>
            <time>{message.date}</time>
        </li>)}</ul>
    </>
}

root.render([title, <MessageList title={'Messages'} messages={messages} />])