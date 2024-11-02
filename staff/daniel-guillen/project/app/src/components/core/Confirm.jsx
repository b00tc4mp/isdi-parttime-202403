import './Confirm.css'
import Button from './Button'

const Confirm = ({ message, onAccept, onCancel }) => (
  <div className="Confirm">
    <div className="ConfirmBox">
      <p>{message}</p>
      <div className="ConfirmButtons">
        <Button className="CancelButton" onClick={onCancel}>Cancelar ❌</Button>
        <Button className="ConfirmButton" onClick={onAccept}>🟢 Continuar</Button>
      </div>
    </div>
  </div>
)

export default Confirm

