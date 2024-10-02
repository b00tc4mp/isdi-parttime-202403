import './Link.css';

export default function Link({ onClick, children, to = '', className = '' }) {
    return (
        <a href={to} onClick={onClick} className={className}>
            {children}
        </a>
    );
}
