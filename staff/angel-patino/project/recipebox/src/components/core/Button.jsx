function Button({ type, className, onClick, children }) {
  return (
    <button
      className={`button ${className ? className : ""}`}
      type={type}
      onClick={onClick}
    >
      {children}
    </button>
  )
}

export default Button
