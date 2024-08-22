import './index.css'

export default ({ message, onAccept, onCancel }) => 
    <div className="justify-center flex items-center">
        <p>{message}</p>
        <button className="Button" onClick={onCancel}>Cancel</button>
        <button className="Button ConfirmButton" onClick={onAccept}>Confirm</button>
    </div>