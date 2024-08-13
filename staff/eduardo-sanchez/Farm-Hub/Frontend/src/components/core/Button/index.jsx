import "./index.css"

export default function Button({ type, children, onClick }) {
    return (

        <button className="Button" type={type} onClick={onClick}>{children}
        </button>

    )
}