import './index.css'

function TextArea({ id, type, placeholder, onChange, value, className }) {
    return <textarea className={`TextArea ${className ? className : ''}`} id={id} type={type} placeholder={placeholder} onChange={onChange} value={value}></textarea>
}

export default TextArea