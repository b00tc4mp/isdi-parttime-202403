import "./View.css"

//parametrizamos View para que admite diferentes tags. Por defecto sera un div salgo si lo queremos cambiar
function View({ tag: Tag = "div", className, children }) {
    return <Tag className={`View ${className ? className : ""}`}>{children}</Tag>
        }

export default View