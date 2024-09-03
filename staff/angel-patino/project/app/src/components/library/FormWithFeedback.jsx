import Form from "../core/Form"
import Text from "../core/Text"

function FormWithFeedback({ onSubmit, children, message, level = "error" }) {
  return (
    <Form className="formWithFeedback" onSubmit={onSubmit}>
      {children}
      {message && <Text className={`feedback ${level}`}>{message}</Text>}
    </Form>
  )
}

export default FormWithFeedback
