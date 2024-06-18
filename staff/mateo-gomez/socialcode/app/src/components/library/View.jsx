import './View.css'

function View({ tag: Tag = 'div', className, children, direction = 'column' }) {
    return <Tag className={`View ${className ? className : ''} ${direction === 'column' ? 'View column' : 'View row'}`}>{children}</Tag>
}

export default View