import './Form.css'

function Form({ onSubmit, children }) {
    return <form className='Form' onSubmit={onSubmit}>{children}</form>
}

export default Form