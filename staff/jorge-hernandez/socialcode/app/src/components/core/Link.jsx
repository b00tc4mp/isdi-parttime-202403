import './Link.css'

export default ({ onClick, children }) => (
  <a className='Link' href='' onClick={onClick}>
    {children}
  </a>
)
