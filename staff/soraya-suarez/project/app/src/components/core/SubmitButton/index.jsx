import Button from '../Button'
import './index.css'

function SubmitButton({ children }) {
    return <Button className="SubmitButton ml-2" type="submit">{children}</Button>
}

export default SubmitButton