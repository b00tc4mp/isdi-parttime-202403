import './index.css'

export default ({ message, onAccept, onCancel }) => <div className="Confirm">
    <p>{message}</p>
    <button className="Button" onClick={onCancel} >Cancel</button>
    <button className="Button" onClick={onAccept} >Confirm</button>
</div>


// export default ({ message, onAccept, onCancel }) => <div class="Confirm">
//     <div class="ConfirmBox">
//         <p>{message}</p>
//         <button class="Button" onClick={onCancel}>Cancel</button>
//         <button class="Button" onClick={onAccept}>Confirm</button>
//     </div>
// </div>