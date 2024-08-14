function Time({ children: time }) {
    const formattedTime = new Date(time).toLocaleString()
    return <time className="m-2">{formattedTime}</time>
}

export default Time