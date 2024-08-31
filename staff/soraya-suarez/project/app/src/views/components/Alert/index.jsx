import './index.css'
import Button from '../../../components/core/Button'

export default ({ message, onAccept, level = 'warn' }) => <div className="Alert">
    <div className={`AlertBox AlertBox-${level}`}>
        <p>{message}</p>
        <Button className="ConfirmButton" onClick={onAccept}>Accept</Button>
    </div>
</div>