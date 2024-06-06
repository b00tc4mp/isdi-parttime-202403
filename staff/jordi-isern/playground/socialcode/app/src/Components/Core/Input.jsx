import './Input.css'

function Input({id, type, placeholder}) {
    return <input className="Input" id={id} type={type} placeholder={placeholder} ></input>
}

export default Input