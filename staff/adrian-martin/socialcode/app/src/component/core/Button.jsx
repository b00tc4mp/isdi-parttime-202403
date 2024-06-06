import './Button.css'

function Button({type, className, children}){
    return <button className={`Button ${className ? className : ''}`} type={type}>{children}</button>
}

export default Button