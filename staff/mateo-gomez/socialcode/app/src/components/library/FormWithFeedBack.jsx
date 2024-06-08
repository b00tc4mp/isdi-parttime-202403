import './FormWithFeedback.css'
import Form from '../core/Form'
import '../core/Form.css'

function FormWithFeedBack({ children, onSubmit }) {
    return <Form className='FormWithFeedback' onSubmit={onSubmit}>{children}</Form>
}

export default FormWithFeedBack