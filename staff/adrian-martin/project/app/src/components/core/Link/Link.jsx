import './Link.css'

function Link({ onClick, children }) {
    return <a href='' className='Link' onClick={onClick} >{children}</a>
}

export default Link