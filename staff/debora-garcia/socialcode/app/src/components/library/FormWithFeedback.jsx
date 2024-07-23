import Form from "../core/Form"
import Text from "../core/Text"
//import "./FormWithFeedback.css"

function FormWithFeedback({ onSubmit, children, message, level="error" }) {
    return <Form className="FormWithFeedback" onSubmit={onSubmit}>{children}
    {message && <Text className={`Feedback ${level}`}>{message}</Text>}</Form>
}

//si envian un mensaje de error se monta el compo de text con el mensaje recibido
// el level por defecto es error, si se envia level succes se montara la classe succes y se eliminara el panel

export default FormWithFeedback