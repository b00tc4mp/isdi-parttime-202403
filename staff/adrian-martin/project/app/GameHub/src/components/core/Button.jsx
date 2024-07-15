import './Button.css'

function Button({ type, className, onClick, children }) {
    return <button type={type} className={`Button ${className ? className : ''}`} onClick={onClick}>{children}</button>
}

export default Button