//import "./Time.css"
//:time personalizamos el nombre de children para darle semantica
function Time({ children: time }) {
    const formattedDate = new Date(time).toLocaleString()

    return <time className="Time">{formattedDate}</time>
}

export default Time