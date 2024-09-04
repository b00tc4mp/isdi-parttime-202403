function View({ tag: Tag = 'div', children, className }) {
    return <Tag className={className}>{children}</Tag>
}

export default View