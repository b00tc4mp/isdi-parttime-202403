//MÉTODO 1
/*function renderMessages(messages) {
    const lis = messages.map(message => <li>
        <h3>{message.username}</h3>
        <p>{message.text}</p>
        <time>{message.date}</time>
    </li>)

    const messageList = <ul>{lis}</ul>

    return messageList
}
*/

//MÉTODO 2
function MessageList({ title, messages }) {

    return <section className='MessageList'>
        <h2 className="title">{title}</h2>

        <ul>{messages.map(message => <li>
            <h3>{message.username}</h3>
            <p>{message.text}</p>
            <time>{message.date}</time>
        </li>)}</ul>
    </section>
}