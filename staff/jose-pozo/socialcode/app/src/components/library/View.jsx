import './View.css'

function View({ tag: Tag = 'div', children }) {
    return <Tag className="view">{children}</Tag>
}

export default View

