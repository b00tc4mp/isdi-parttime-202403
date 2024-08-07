import Form from '../../core/Form/Form'
import Text from '../../core/Text/Text'

function FormWithFeedback({ onSubmit, className, children, message, level = 'error' }) {
    return <Form className={className} onSubmit={onSubmit}>
        {children}
        {message && <Text className={`Feedback ${level}`}>{message}</Text>}
    </Form>
}

export default FormWithFeedback