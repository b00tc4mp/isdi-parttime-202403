const root = ReactDOM.createRoot(document.getElementById("root"))

const title = <h1>Chat Room</h1>

const helloButton = <button onClick={() => alert("hola")}> Hello</button>

root.render([title, helloButton, <Counter />, <Messages />])



