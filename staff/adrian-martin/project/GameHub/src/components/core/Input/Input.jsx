import './Input.css'

function Input({ id, type, placeholder, className }) {
    return <input className={className} id={id} type={type} placeholder={placeholder} />
}

export default Input