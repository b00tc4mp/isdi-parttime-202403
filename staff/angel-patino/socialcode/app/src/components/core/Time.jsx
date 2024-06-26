import "./Time.css"

function Time({ children: time }) {
  const formattedTime = new Date(time).toLocaleString()
  return <time>{formattedTime}</time>
}

export default Time
