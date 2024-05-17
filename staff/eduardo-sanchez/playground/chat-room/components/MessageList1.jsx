function MessageList({ title, messages }) {
    console.log('MessageList -> "render"')

    return <section className="MessageList">
        <h2 className="title">{title}</h2>

        <ul>{messages.map(message => <li>
            <h3>{message.username}</h3>
            <p>{message.text}</p>
            <time>{message.date}</time>
        </li>)}</ul>
    </section>
}