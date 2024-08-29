import "./index.css"

function Input({ id, type, placeholder }) {
  return <input className="Input" id={id} type={type} placeholder={placeholder} required />
}

export default Input
