import Form from "../core/Form"

import "./FormWithFeedback.css"

function FormWithFeedback({ onSubmit, children }) {
    return <Form className="FormWithFeedback" onSubmit={onSubmit}>{children}</Form>
}

export default FormWithFeedback