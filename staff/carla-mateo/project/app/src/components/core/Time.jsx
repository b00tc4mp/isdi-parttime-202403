function Time({ date }) {
    if (!date) return null

    const newDate = new Date(date)

    const onlyDate = newDate.toISOString().split('T')[0]

    return <time className="m-2">{onlyDate}</time>
}

export default Time