import './index.css'

function Input({ id, type, placeholder, value, onChange, min, max }) {
    return <input className="Input" id={id} type={type} placeholder={placeholder} value={value} onChange={onChange}/>
}

export default Input