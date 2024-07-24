import "./View.css"

//parametrizamos View para que admite diferentes tags. Por defecto sera un div salgo si lo queremos cambiar
//personalizamos para cambiar el layout. Por defecto es column, sino lo cambia a row
function View({ tag: Tag = "div", className, children, direction = "column", align = "center" }) {
    return <Tag className={`View ${className ? className : ""} ${direction === "column" ? "View column" : "View row"} ${align === "center" ? "View center" : ""}`}>{children}</Tag>
}

export default View