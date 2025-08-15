/* function Link({onClick, children}) {
    return <a href="" onClick={onClick}>{children}</a>
}

export default Link */

export default function Link({ onClick, children, to = "" }) {
    return <a href={to} onClick={onClick}>{children}</a>
}

/* export default ({onClick, children})=> <a href="" onClick={onClick}>{children}</a> */
/* const Link=({onClick, children})=> <a href="" onClick={onClick}>{children}</a> */