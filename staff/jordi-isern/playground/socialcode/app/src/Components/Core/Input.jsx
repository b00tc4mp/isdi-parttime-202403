import './Input.css'

function Input({id, type, placeholder}) {
    return <div className='divInput'>
        <input className="Input" id={id} type={type} placeholder={placeholder}></input>
        </div>
}

export default Input