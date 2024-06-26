import './FormWithFeedback.css'
import Form from '../core/Form.jsx' 
    
function FormWithFeedback ({ onSubmit, children }) {
    return <Form className="FormWithFeedback" onSubmit={onSubmit}>{children}</Form>
}

export default FormWithFeedback