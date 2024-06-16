function Button({ type, className, children }) {
    return <button type={type} className={`Button ${className ? className : ''}`}>
        {children}
    </button>
}

export default Button