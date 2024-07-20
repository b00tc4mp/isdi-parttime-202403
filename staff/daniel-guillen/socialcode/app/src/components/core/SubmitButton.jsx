import Button from './Button'

//Simport './SubmitButton.css'

function SubmitButton({ children }) {
    return <Button className="SubmitButton" type="submit">{children}</Button>
}

export default SubmitButton