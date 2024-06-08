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

//? Diferentes formas de hacer lo mismo en una sola linea

/* export default function Link({ onClick, children }) {
    return <a href="" onClick={onClick}>{children}</a>
}*/

/*export default function ({ onClick, children }) {
    return <a href="" onClick={onClick}>{children}</a>
} */

/*const Link = ({ onClick, children }) => <a href="" onClick={onClick}>{children}</a>

export default Link */

/*export default ({ onClick, children }) => <a href="" onClick={onClick}>{children}</a> */
