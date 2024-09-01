import './Link.css'

function Link({ children, target, onClick }) {
    return <a className='Link' href='' onClick={onClick} target={target}>{children}</a>
}

export default Link



//________________________________________________________________________

// function Link({ onClick, children }) {
//     return <a href="" onClick={onClick}>{children}</a>
// }

// export default Link

//_______________________________________________________________________

// export default function Link({ onClick, children }) {
//     return <a href="" onClick={onClick}>{children}</a>
// }

//__________________________________________________________________________

// export default function ({ onClick, children }) {
//     return <a href="" onClick={onClick}>{children}</a>
// }

//___________________________________________________________________________


// const Link = ({ onClick, children }) => <a href="" onClick={onClick}>{children}</a>

// export default Link

//_______________________________________________________________________


//export default ({ onClick, children }) => <a href="" onClick={onClick}>{children}</a>
