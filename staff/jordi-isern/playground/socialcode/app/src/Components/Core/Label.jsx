function Label({htmlFor, children}) {
    return <label className="label" htmlFor={htmlFor}>{children}</label>
}

export default Label