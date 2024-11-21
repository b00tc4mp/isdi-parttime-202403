const rootElement = document.getElementById("root")

const root = ReactDOM.createRoot(rootElement)

const title = <h1>Chat Room</h1>

const messages = [
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
    },
]

// cambiamos funcion propia a funcion componente de REact, un modo mas declarativo 
// el objeto props recibe messages y desestructuramos el objerto props 
function MessageList(props) {

    //const messages = props.messages objecto con propiedad messages
    const { title, messages } = props

    const lis = messages.map(message => <li>
        <h3>{message.username}</h3>
        <p>{message.text}</p>
        <time>{message.date}</time>
    </li>)

    const messageList = <ul>{lis}</ul>
    //return messageList
    return [title, messageList]
}

const helloButton = <button onClick={() => alert("hola")}> Hello</button>

//declaramos como un componente con la prop messages 

//root.render([title, <MessageList messages={messages} />, helloButton])
root.render([title, <MessageList title={"Messages"} messages={messages} />, helloButton])
// MessageList recibe dos props y las incrustamos 

// DESTRUCTURING


