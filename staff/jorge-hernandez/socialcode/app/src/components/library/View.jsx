import './View.css'

function View({
  tag: Tag = 'div',
  className,
  children,
  direction = 'column',
  align = 'center',
}) {
  return (
    <Tag
      className={`View ${className ? className : ''} 

      `}
    >
      {children}
    </Tag>
  )
}

export default View
