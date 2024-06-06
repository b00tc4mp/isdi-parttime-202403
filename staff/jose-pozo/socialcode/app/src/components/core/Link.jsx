import './Link.css'

function Link({ children, target, onClick }) {
    return <a className='Link' href='' onClick={onClick} target={target}>{children}</a>
}

export default Link