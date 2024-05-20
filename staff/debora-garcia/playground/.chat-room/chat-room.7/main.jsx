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




const helloButton = <button onClick={() => alert("hola")}> Hello</button>


root.render([title, <MessageList title={"Messages"} messages={messages} />, helloButton])

// DESTRUCTURING


