import './index.css'

function TextArea({ id, type, placeholder, onChange, value }) {
    return <textarea className='TextArea' id={id} type={type} placeholder={placeholder} onChange={onChange} value={value}></textarea>
}

export default TextArea