import "./index.css"
import Heading from "../core/Heading"
function Title({ children }) {
  console.log("Title --> render")
  return (
    <>
      <Heading level="1" className="HeaderLoginRegister">
        {children}
      </Heading>
    </>
  )
}

export default Title
