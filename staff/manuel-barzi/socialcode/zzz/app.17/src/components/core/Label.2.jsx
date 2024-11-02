function Label(props) {
    const { htmlFor, children } = props

    return <label className="Label" htmlFor={htmlFor}>{children}</label>
}

export default Label