function Label(props) {
    return <label className="Label" htmlFor={props.htmlFor}>{props.children}</label>
}

export default Label