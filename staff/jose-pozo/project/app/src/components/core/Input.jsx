function Input({ id, type, className, placeholder, value, onChange, disabled = false, required = true }) {
    return <input className={`Input ${className ? className : ''}`} id={id} type={type} placeholder={placeholder} value={value} onChange={onChange} disabled={disabled} required={required} />
}

export default Input