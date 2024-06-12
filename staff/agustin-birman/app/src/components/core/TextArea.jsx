import './TextArea.css'

function TextArea({ id, type, placeholder }) {
    return <textarea className='TextArea' id={id} type={type} placeholder={placeholder}></textarea>
}

export default TextArea