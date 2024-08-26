import './index.css';
import { Button as BootstrapButton } from 'react-bootstrap';

function Button({ type, className, onClick, children, disabled }) {
    return (
        <BootstrapButton
            className={`Button ${className ? className : ''}`}
            type={type}
            onClick={onClick}
            disabled={disabled}
        >
            {children}
        </BootstrapButton>
    );
}

export default Button;
