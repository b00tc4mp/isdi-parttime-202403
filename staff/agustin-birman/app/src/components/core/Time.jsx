function Time({ children: time }) {
    const formattedTime = new Date(time).toLocaleString()

    return <time className='Time'>{formattedTime}</time>
}

export default Time