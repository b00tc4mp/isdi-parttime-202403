import "./index.css"

export default function Heading({ level, children, className }) {
    const Tag = `h${level}`
    return <Tag className={className}>{children}</Tag>

}