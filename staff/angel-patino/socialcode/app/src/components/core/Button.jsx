    import './Button.css'
    
    function Button ({ type, className, onClick, children }) {
        return <button className={`Button ${className ? className: ''}`} onClick={onClick} type={type}>{children}</button>
    }

    export default Button