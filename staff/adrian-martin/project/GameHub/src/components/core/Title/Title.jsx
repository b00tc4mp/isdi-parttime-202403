import './Title.css'

import Heading from "../Heading/Heading"

function Title({ children }) {
    return <Heading className='Title' level='1'>{children}</Heading>
}

export default Title