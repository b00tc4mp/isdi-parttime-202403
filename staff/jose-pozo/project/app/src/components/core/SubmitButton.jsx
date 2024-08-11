function SubmitButton({ className, children }) {
    return <button className={`SubmitButton ${className ? className : ''}`} type='submit'>{children}</button>
}

export default SubmitButton