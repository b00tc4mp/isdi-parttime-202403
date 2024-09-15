function ViewBox({ tag: Tag = 'div', className, children }) {
    return <Tag className={`${className ? className : ''}`}>{children}</Tag>
}

export default ViewBox