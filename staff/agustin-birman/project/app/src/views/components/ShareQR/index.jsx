import QRCode from 'react-qr-code'
import extractPayloadFromJWT from '../../../utils/extractPayloadFromJWT'
import Text from '../../../components/core/Text'
import Button from '../../../components/core/Button'
import { Link } from 'react-router-dom'
import './index.css'

function ShareQR() {
    const { sub: userId } = extractPayloadFromJWT(localStorage.token) //TODO hacer la funcion userID
    const url = `${import.meta.env.VITE_APP_URL}/users/${userId}/add`

    return <div className='QRContainer'>
        < QRCode
            className='QR'
            value={url}
            size={256}
            bgColor='#ffffff'
            fgColor='#000000'
        />
        <Text>Ask to your teacher to scan this code!</Text>
        <Button className='QRButton'><Link to='/'>Go Home</Link></Button>
    </div>
}

export default ShareQR