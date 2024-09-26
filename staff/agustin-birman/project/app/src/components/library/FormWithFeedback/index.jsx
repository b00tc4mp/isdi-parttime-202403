import Form from '../../core/Form'
import Text from '../../core/Text'

import './index.css'

function FormWithFeedback({ className, onSubmit, children, message, level }) {
    return <Form className={`FormWithFeedback ${className ? className : ''}`} onSubmit={onSubmit}>{children}
        {message && <Text className={`Feedback ${level}`}>{message}</Text>}
    </Form>
}

export default FormWithFeedback