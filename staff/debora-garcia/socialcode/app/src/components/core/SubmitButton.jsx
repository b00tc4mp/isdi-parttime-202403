import Button from "./Button"
//import "./SubmitButton.css"

function SubmitButton({ children }) {
    return <Button className="SubmitButton" type="submit">{children}</Button>
}

export default SubmitButton

//le agrega la classe al Button