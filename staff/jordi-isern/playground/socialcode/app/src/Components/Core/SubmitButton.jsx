import Button from './Button'
import './SubmitButton.css'


function SubmitButton({children}) {
    return <Button className = "submitButton" type="submit">{children}</Button>
}

export default SubmitButton