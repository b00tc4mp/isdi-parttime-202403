import './Field.css';

export default function Field({ id, type, placeholder, children }) {
    return (
        <div className="Field">
            <label htmlFor={id}>{children}</label>
            <input id={id} type={type} placeholder={placeholder} />
        </div>
    );
}
