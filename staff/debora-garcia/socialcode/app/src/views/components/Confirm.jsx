
export default ({ message, onAccept, onCancel }) => <div className="Confirm">
    <div className="ConfirmBox">
        <p>{message}</p>
        <div className="ConfirmButtons">
            <button className="Button" onClick={onCancel}>Cancel</button>
            <button className="Button" onClick={onAccept}>Confirm</button>
        </div>
    </div>
</div>