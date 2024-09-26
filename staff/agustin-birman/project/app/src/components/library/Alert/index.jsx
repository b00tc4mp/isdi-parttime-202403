import { Button } from 'react-bootstrap'
import Text from '../../core/Text'
import './index.css'

export default ({ message, onAccept, level = 'warn' }) => <div className="Alert">
    <div className={`AlertBox AlertBox-${level}`}>
        <Text>{message}</Text>
        <Button className="Button" onClick={onAccept}>Accept</Button>
    </div>
</div>