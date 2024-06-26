    function Heading({ level, children }) {
        const Tag = `h${level}`

        return <Tag>{children}</Tag>
    }

    export default Heading