function Label({ htmlFor, children, className }) {
    return <label className={`Label ${className ? className : ''}`} htmlFor={htmlFor} >{children}</label >
}

export default Label