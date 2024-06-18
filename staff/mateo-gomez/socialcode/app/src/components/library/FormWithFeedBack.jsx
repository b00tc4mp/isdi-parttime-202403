import './FormWithFeedback.css'
import Form from '../core/Form'
import '../core/Form.css'
import Text from '../core/Text'

function FormWithFeedBack({ children, onSubmit, message, level = 'error' }) {
    return <Form className='FormWithFeedback' onSubmit={onSubmit}>
        {children}
        {message && <Text className={`Feedback ${level}`}>{message}</Text>}
    </Form>
}

export default FormWithFeedBack