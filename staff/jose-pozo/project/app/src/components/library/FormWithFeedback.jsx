import Form from '../core/Form'
import Text from '../core/Text'

function FormWithFeedback({ className, onSubmit, children, message, level = 'error' }) {
    return <Form className={`FormWithFeedback ${className ? className : ''}`} onSubmit={onSubmit}>
        {children}
        {message && <Text className={`Feedback ${level}`}>{message}</Text>}
    </Form>
}

export default FormWithFeedback