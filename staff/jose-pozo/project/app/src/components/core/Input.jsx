function Input({ id, type, className, placeholder, disabled = false, required = true }) {
    return <input className={`Input ${className ? className : ''}`} id={id} type={type} placeholder={placeholder} disabled={disabled} required={required} />
}

export default Input