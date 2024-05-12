const rootElement = document.getElementById('root')

const root = ReactDOM.createRoot(rootElement)

const title = <h1>Chat-Room</h1>

const {Component} = React

root.render([title, <Counter />, <Messages />])