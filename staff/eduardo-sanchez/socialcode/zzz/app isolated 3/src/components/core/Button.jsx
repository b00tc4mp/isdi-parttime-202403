function Button({ type, className, children }) {
    return <button className={`Button ${className ? className : ''}`} type={type}>{children}</button>
}

export default Button

// function Button({ type, children }) {
//     return <button className="Button" type={type}>{children}</button>
// }

// export default Button