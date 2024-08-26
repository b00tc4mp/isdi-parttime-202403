function Time({ children: time }) {
    const formattedTime = new Date(time).toLocaleString('de-DE', { timeZone: 'Europe/Berlin' });


    return <time className='Time'>{formattedTime}</time>
}

export default Time