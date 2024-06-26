import Text from "../core/Text.jsx"
import Form from "../core/Form.jsx"

import "./FormWithFeedback.css"

function FormWithFeedback({ onSubmit, children, message, level = "erorr" }) {
  return (
    <Form className="FormWithFeedback" onSubmit={onSubmit}>
      {children}
      {message && <Text className={`Feedback ${level}`}>{message}</Text>}
    </Form>
  )
}

export default FormWithFeedback
