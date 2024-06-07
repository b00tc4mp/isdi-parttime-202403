import "./Link.css"
function Link({ onClick, children }) {
	return (
		<>
			<a className="Link" onClick={onClick}>
				{children}
			</a>
		</>
	)
}

export default Link
