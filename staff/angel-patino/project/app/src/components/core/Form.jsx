function Form({ className, onSubmit, children }) {
  return (
    <form className={`form ${className ? className : ""}`} onSubmit={onSubmit}>
      {children}
    </form>
  )
}

export default Form
