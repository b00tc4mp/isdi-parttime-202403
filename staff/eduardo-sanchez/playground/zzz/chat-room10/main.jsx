
const rootElement = document.getElementById('root')

const root = ReactDOM.createRoot(rootElement)


const title = <h1>Chat Room</h1>

const messages = [
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

function MessageList({ title, messages }) {
    return <section className="MessageList">
        <h2 className="title">{title}</h2>

        <ul>{messages.map(message => <li>
            <h3>{message.username}</h3>
            <p>{message.text}</p>
            <time>{message.date}</time>
        </li>)}</ul>
    </section>
}

root.render([title, <MessageList title={'Messages'} messages={messages} />])