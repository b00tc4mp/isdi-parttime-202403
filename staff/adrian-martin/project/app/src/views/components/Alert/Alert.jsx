import './Alert.css'
import Button from '../../../components/core/Button/Button'

function Alert({ message, onAccept }) {
    return (
        <div className='Alert-container'>
            <div className='Alert-p-button'>
                <p className='Alert-p'>{message}</p>
                <Button onClick={onAccept} className='Alert-button'>Aceptar</Button>
            </div>
        </div>
    )
}

export default Alert