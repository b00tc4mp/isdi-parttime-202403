import "./index.css"
import Button from "../../../components/Button"


export default ({ message, onAccept, onCancel }) => (

    <div className="Confirm">
        <div className="confirm-box">
            <p className="confirm-message">{message}</p>
            <div className="confirm-buttons">
                <Button className="confirm-accept" onClick={onAccept}>Accept</Button>
                <Button className="confirm-cancel" onClick={onCancel}>Cancel</Button>
            </div>
        </div>
    </div>
)