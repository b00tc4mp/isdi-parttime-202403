import './Alert.css'
import Button from './Button'

const Alert = ({ message, onAccept, level = 'warn' }) =>
<div className="Alert">
    <div className={`AlertBox AlertBox-${level}`}>
        <p>{message}</p>
        <Button className="AcceptButtons" onClick={onAccept}>Aceptar</Button>
    </div>
</div>

export default Alert