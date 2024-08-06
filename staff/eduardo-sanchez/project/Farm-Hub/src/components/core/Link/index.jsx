import './index.css';

function Link({ onClick, children, to = "", className = "" }) {
    return <a href={to} onClick={onClick} className={className}>{children}</a>;
}

export default Link;





// import './index.css'

// export default ({ onClick, children, to = "" }) => <a href={to} onClick={onClick}>{children}</a>


