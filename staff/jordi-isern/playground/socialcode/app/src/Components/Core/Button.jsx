import './Button.css'

function Button(type ,className, children, onClick ) {
    return <button onClick={onClick} className={`Button ${className ? className:''}`} type={type}>{children}</button>
    
}

export default Button