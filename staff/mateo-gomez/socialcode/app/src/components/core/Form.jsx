
import '../library/FormWithFeedback.css'

function Form({ className, children, onSubmit }) {
    return <form className={`flex flex-col items-center justify-center bg-[#e4b322] rounded-[15%] w-[30vh] ${className ? className : ""}`} onSubmit={onSubmit}>{children}</form>
}

export default Form