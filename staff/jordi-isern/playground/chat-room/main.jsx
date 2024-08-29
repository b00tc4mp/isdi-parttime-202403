const rootElement = document.getElementById('root')

const root = ReactDOM.createRoot(rootElement)

const title = <h1>Chat room</h1>

root.render ([title, <Counter />, <Messages />])

 //TODO leer sobre bind() jason arnold  dan abramov