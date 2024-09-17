import "./index.css"

function View({ tag: Tag = 'div', className, children, direction = 'column', align = 'center', title = '' }) {
    return (
        <div className={`View ${className ? className : ''} ${direction === 'column' ? 'View column' : 'View row'} ${align === 'center' ? 'View center' : ''}`}>
            <h2 className="text-2xl">{title}</h2>
            <Tag>{children}</Tag>
        </div>
    )
}

export default View