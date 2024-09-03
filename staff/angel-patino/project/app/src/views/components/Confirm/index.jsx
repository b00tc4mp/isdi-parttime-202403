export default ({ message, onAccept, onCancel }) => (
  <div className="Confirm">
    <div className="Confirm-box">
      <p>{message}</p>
      <button className="Button" onClick={onCancel}>
        Cancel
      </button>
      <button className="Button" onClick={onAccept}>
        Confirm
      </button>
    </div>
  </div>
)
