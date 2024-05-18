const root = ReactDOM.createRoot(document.getElementById('root'))

//if (!logic.isUserLoggedIn())
//    location.href = '../login'

const title = <h1>Chat Room</h1>

root.render([title, <Counter />, <Messages />])
