import './index.css'

function Input({ id, type, name, placeholder, value, checked, onChange, className, required }) {
    return <input
        className={`Input ${className ? className : ''}`}
        id={id}
        type={type}
        name={name}
        placeholder={placeholder}
        value={value}
        checked={checked}
        onChange={onChange}
        required={required} />
}

export default Input