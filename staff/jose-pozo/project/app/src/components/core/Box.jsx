function Box({ className, children }) {
    return <div className={`Box ${className ? className : ''}`}>{children}</div>
}

export default Box