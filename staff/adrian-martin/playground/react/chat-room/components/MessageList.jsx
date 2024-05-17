const {Component} = React

class MessageList extends Component{
    constructor(){
        super()

    }

    render() {
        const { title, messages } = this.props

        return <section className="MessageList">
            <h2 className="title">{title}</h2>

            <ul>{messages.map(message => <li>
                <h3>{message.username}</h3>
                <p>{message.text}</p>
                <time>{message.date}</time>
            </li>)}</ul>
        </section>
    }
}


// function MessageList({ title, messages }) {
//     return <section className="MessageList">
//         <h2 className="title">{title}</h2>

//         <ul>{messages.map(message => <li>
//             <h3>{message.username}</h3>
//             <p>{message.text}</p>
//             <time>{message.date}</time>
//         </li>)}</ul>
//     </section>
// }

// function MessageList(props) {
//     const {title, messages} = props

//     const lis = messages.map(message => <li>
//         <h3>{message.username}</h3>
//         <p>{message.text}</p>
//         <time>{message.date}</time>
//     </li>)
    
//     const messageList = <ul>{lis}</ul>

//     return [<h2>{title}</h2>, messageList]
// }
