function Button({ type, className, children, onClick }) {
  return <button className={`Button ${className ? className : ''}`} type={type} onClick={onClick}>{children}</button>
}

export default Button