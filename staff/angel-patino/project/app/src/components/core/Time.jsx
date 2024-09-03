function Time({ children: time }) {
  const formattedTime = new Date(time).toLocaleString()

  return <time className="time">{formattedTime}</time>
}

export default Time
