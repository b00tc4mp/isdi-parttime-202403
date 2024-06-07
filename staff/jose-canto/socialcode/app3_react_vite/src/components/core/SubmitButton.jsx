import "./SubmitButton.css"

function SubmitButton({ type, children }) {
	return (
		<>
			<button className="Button SubmitButton" type={type}>
				{children}
			</button>
		</>
	)
}

export default SubmitButton
