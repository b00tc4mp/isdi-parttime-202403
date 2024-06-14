import "./Text.css"

function Text({ className, children }) {
	return (
		<>
			<p className={`Text ${className ? className : ""}`}>{children}</p>
		</>
	)
}

export default Text
