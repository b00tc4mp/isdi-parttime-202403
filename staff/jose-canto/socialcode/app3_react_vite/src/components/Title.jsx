import "./Title.css"
import Heading from "./core/Heading"
function Title({ children }) {
	return (
		<>
			<Heading level="1" className="HeaderLoginRegister">
				{children}
			</Heading>
		</>
	)
}

export default Title
