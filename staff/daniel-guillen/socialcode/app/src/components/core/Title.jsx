import Heading from "./Heading"
import "./Title.css"

function Title({ children }) {
    return <Heading level="1">{children}</Heading>
}

export default Title