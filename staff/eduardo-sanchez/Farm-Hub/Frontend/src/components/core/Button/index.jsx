import "./index.css"

export default function Button({ type, children, onClick, className }) {
    return (

        <button className={`Button ${className ? className : ''}`} type={type} onClick={onClick}>{children}
        </button>

    )
}