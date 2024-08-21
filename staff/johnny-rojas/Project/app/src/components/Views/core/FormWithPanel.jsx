import Form from '../core/Form'

function FormWithPanel({ onSubmit, children, message, level = 'error' }) {
  return <Form className="FormWithPanel" onSubmit={onSubmit}>
      {children}
      {message && <p className={`Panel ${level}`}>{message}</p>}
  </Form>
}

export default FormWithPanel

//TODO REVISAR EL PANNEL UTILIZAR Alert