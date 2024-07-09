import "./Time.css"

function Time({ children: time, className }) {
	console.log("Time --> render")
	const date = new Date(time)
	const options = {
		year: "numeric",
		month: "2-digit",
		day: "2-digit",
		hour: "2-digit",
		minute: "2-digit",
	}
	const formattedTime = new Intl.DateTimeFormat("es-ES", options).format(date)

	return <time className={className}>{formattedTime}</time>
}

export default Time
