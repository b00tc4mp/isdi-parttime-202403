import './Button.css'

function Button({
  type,
  className,
  title,
  onClick,
  onMouseEnter,
  onMouseLeave,
  children,
}) {
  return (
    <button
      className={`Button ${className ? className : ''}`}
      title={`${title ? title : ''}`}
      type={type}
      onClick={onClick}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      {children}
    </button>
  )
}
export default Button
