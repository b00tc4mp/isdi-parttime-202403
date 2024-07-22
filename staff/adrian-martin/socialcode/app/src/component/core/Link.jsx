import './Link.css'

function Link({onClick, className, children}){
    return <a href="" className={className} onClick={onClick}>{children}</a>
}

export default Link



// export default function ({onClick, className, children}){
//     return <a href="" className={className} onClick={onClick}>{children}</a>
// }


// export default ({onClick, className, children}) => <a href="" className={className} onClick={onClick}>{children}</a>
