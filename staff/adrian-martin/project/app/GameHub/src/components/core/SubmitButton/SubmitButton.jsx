import './SubmitButton.css'

import Button from '../Button/Button'

function SubmitButton({ children }) {
    return <Button className='SubmitButton' type='submit' >{children}</Button>
}

export default SubmitButton