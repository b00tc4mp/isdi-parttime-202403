import Form from '../core/Form'
import './FormWithFeedback.css'

function FormWithFeedback({
  onSubmit,
  className,
  children,
  message,
  level = 'error',
}) {
  return (
    <Form
      className={`FormWithFeedback ${className ? className : ''}`}
      onSubmit={onSubmit}
    >
      {children}
      {message && <p className={`Feedback ${level}`}>{message}</p>}
    </Form>
  )
}

export default FormWithFeedback
