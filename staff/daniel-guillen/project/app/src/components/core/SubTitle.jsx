import Heading from "./Heading"
import './Title.css'

function SubTitle({ className, children }) {
    return <Heading className={`SubTitle ${className ? className : ''}`} level="1">{children}</Heading>
}

export default SubTitle