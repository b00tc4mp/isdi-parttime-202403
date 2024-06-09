import "./Form.css"

function Button({ type, children }) {
    return <button className="Button" type={type}>{children}</button>
}

export default Button