import Form from '../core/Form'

import './FormWithFeedback.css'

function FormWithFeedback({ className, onSubmit, children }) {
    return <Form className={`FormWithFeedback ${className ? className : ''}`} onSubmit={onSubmit}>{children}</Form>
}

export default FormWithFeedback