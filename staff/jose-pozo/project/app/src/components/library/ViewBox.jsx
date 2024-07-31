function ViewBox({ tag: Tag = 'div', className, children }) {
    return <Tag className={`Box ${className ? className : ''}`}>{children}</Tag>
}

export default ViewBox