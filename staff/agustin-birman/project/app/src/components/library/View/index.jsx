import './index.css'

function View({ tag: Tag = 'div', children, className }) {
    return <Tag className={`View ${className ? className : ''}`}>{children}</Tag>
}

export default View
