import './Input.css'

function Input({ id, type, placeholder }) {
  return (
    <input className='Input' type={type} id={id} placeholder={placeholder} />
  )
}

export default Input
