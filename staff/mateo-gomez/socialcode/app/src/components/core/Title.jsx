import Heading from './Heading'
import './Title.css'


function Title({ className, children }) {
    return <Heading className={`MainTitle ${className ? className : ''}`} level='1'>{children}</Heading>
}

export default Title