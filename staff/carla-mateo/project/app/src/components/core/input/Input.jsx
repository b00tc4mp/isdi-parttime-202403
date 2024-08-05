import './Input.css'

export default function Input({ id, type, placeholder }) {
    return <input className="Input" id={id} type={type} placeholder={placeholder}></input>
}

