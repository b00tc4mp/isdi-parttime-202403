import "./index.css"

function Form({ className, onSubmit, children }) {
  return (
    <>
      <form className={`Form ${className ? className : ""} `} onSubmit={onSubmit}>
        {children}
      </form>
    </>
  )
}

export default Form
