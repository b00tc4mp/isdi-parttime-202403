import './Form.css'
import '../library/FormWithFeedback.css'

function Form({ className, children, onSubmit }) {
    return <form className={`Form ${className ? className : ""}`} onSubmit={onSubmit}>{children}</form>
}

export default Form