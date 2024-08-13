import './index.css';

export default function Link({ onClick, children, to = "", className = "" }) {
    return <a href={to} onClick={onClick} className={className}>{children}</a>;
}

// import './index.css'

// export default ({ onClick, children, to = "" }) => <a href={to} onClick={onClick}>{children}</a>


