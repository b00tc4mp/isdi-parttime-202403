import './index.css'

function Text({ children, className }) {
    return <p className={`Text ${className ? className : ''}`}>{children}
    </p>
}

export default Text