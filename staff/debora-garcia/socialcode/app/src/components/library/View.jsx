import "./View.css"

//parametrizamos View para que admite diferentes tags. Por defecto sera un div salgo si lo queremos cambiar
function View({ tag: Tag = "div", children }) {
    return <Tag className="View">{children}</Tag>
}

export default View