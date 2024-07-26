export default ({ onClick, children, to = "" }) => <a href={to} onClick={onClick}>{children}</a>

// export default ({ onClick, children }) => <a href="" onClick={onClick}>{children}</a>