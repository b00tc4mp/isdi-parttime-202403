const root = ReactDOM.createRoot(document.getElementById('root'))

const title = <h1>Chat Room</h1>

root.render([title, <Counter />, <Messages />])