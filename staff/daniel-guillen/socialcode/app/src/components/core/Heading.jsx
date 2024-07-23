function Heading({ level, children, className }) {
    const Tag = `h${level}`

    return <Tag className={className}>{children}</Tag>
}

export default Heading