import './SubmitButton.css'

function SubmitButton({ children }) {
    return <button className='SubmitButton' type='submit'>{children}</button>
}

export default SubmitButton