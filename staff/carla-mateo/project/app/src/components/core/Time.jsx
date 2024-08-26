export default function Time({ children: time }) {
    if (!time || typeof time !== 'string' || isNaN(Date.parse(time))) return null

    const date = new Date(time)
    const options = {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit'
    }
    const formattedTime = new Intl.DateTimeFormat('es-ES', options).format(date)

    return <time className='w-15 truncate'>{formattedTime}</time>
}

