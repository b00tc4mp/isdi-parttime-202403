import './Input.css';

function Input({ id, type, placeholder, className, name, value, onChange, style, defaultValue }) {
    return (
        <input
            id={id}
            type={type}
            placeholder={placeholder}
            className={className}
            name={name}
            value={value}
            onChange={onChange}
            style={style}
            defaultValue={defaultValue}
        />
    );
}

export default Input;