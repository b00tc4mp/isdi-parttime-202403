import './Title.css'

import Heading from "../Heading/Heading"

function Title({ children }) {
    return <Heading level='1'>{children}</Heading>
}

export default Title