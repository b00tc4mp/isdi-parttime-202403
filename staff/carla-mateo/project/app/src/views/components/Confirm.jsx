export default ({ message, onConfirm, onCancel }) => <div className="fixed top-0 left-0 w-full h-full flex justify-center items-center">
    <div className="">
        <p>{message}</p>
        <button className="Button" onClick={onCancel}>Cancel</button>
        <button className="Button" onClick={onConfirm}>Confirm</button>
    </div>
</div>