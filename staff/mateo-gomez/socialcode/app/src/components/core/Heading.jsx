function Heading({ level, className, children }) {
    const Tag = `h${level}`

    return <Tag className={` ${className ? className : ''}`}>{children}</Tag>

}

export default Heading