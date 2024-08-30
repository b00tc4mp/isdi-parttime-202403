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


function MessageList({ title, messages }) {
    //pasamos directamente las variables en las props

  

    // const lis = messages.map(message => <li>
    //     <h3>{message.username}</h3>
    //     <p>{message.text}</p>
    //     <time>{message.date}</time>
    // </li>)

    //const messageList = <ul>{lis}</ul> quitamos esta variable para incluirlo en el return
    // con el contenedor vacio podemos presentarlo como en html
    return <> 
        <h2>{title}</h2>
        <ul>{messages.map(message =>
            <li>
                <h3>{message.username}</h3>
                <p>{message.text}</p>
                <time>{message.date}</time>
            </li>)}
        </ul>
    </>
}

const helloButton = <button onClick={() => alert("hola")}> Hello</button>


root.render([title, <MessageList title={"Messages"} messages={messages} />, helloButton])

// DESTRUCTURING


