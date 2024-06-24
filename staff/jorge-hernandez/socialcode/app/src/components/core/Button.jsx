import './Button.css'

function Button({ type, className, title, onClick, children }) {
  return (
    <button
      className={`Button ${className ? className : ''}`}
      title={`${title ? title : ''}`}
      type={type}
      onClick={onClick}
    >
      {children}
    </button>
  )
}
export default Button
