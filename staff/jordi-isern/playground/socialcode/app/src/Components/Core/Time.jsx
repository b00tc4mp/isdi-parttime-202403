

function Time({children: time}) {
    const formatedTime = new Date(time).toLocaleString()

    return <time className='Time'>{formatedTime}</time>
}

export default Time