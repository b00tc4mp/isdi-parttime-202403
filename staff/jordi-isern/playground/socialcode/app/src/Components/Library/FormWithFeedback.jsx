import Form from "../Core/Form.jsx";

import "./FormWithFeedback.css"

function FormWithFeedback({onSubmit, children}){
    return <Form className="FormWithFeedback" onSubmit={onSubmit}>{children}</Form>
}

export default FormWithFeedback