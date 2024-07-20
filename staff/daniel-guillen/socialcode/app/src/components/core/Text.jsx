//import './Text.css'

//function Text({ children }) {
//    return <p className="Text">{children}</p>
function Text({ children, className }) {
    return <p className={`Text ${className}`}>{children}</p>
}

export default Text