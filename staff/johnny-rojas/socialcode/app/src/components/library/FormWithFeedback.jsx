import Form from '../core/Form'

import './FormWithFeedback.css'

function FormWithFeedback({ onSubmit, children, message, level = 'error' }) {
    return <Form className="FormWithFeedback" onSubmit={onSubmit}>
        {children}
        {message && <p className={`Feedback ${level}`}>{message}</p>}
    </Form>
}

export default FormWithFeedback