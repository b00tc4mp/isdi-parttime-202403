import QRCode from 'react-qr-code'
import Text from '../../../components/core/Text'
import Button from '../../../components/core/Button'
import { Link } from 'react-router-dom'
import './index.css'
import { Context } from '../../../useContext'
import { useContext } from 'react'
function ShareQR() {
    const [userId, setUserId] = useState('')

    const { alert } = useContext(Context)

    useEffect(() => {
        getUserId()
    }, [])

    const getUserId = () => {
        try {
            const userrId = logic.getUserId()
            setUserId(userrId)
        } catch (error) {
            console.error(error)

            alert(error.message)
        }
    }

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