import Form from '../../core/Form/Form'
import Text from '../../core/Text/Text'

function FormWithFeedback({ onSubmit, children, message, level = 'error' }) {
    return <Form className='FormWithFeedback' onSubmit={onSubmit}>
        {children}
        {message && <Text className={`Feedback ${level}`}>{message}</Text>}
    </Form>
}

export default FormWithFeedback