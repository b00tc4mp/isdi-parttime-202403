import './index.css'

export default ({ message, onAccept, onCancel }) => 
    <div className="container-center min-h-screen">
        <p>{message}</p>
        <button className="Button" onClick={onCancel}>Cancel</button>
        <button className="Button" onClick={onAccept}>Confirm</button>
    </div>