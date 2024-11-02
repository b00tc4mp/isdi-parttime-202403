import './text.css'

function Text({ className, children }) {
    return <p className={`Text ${className}`}>{children}</p>
}

export default Text