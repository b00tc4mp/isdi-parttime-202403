import './View.css'

function View ({tag: Tag = 'div', children}){
    return <Tag className="View">{children}</Tag>
}

export default View 