import {useLocation, useNavigate} from 'react-router-dom'

import Text from '../../../Components/Core/Text'
import Button from '../../../Components/Core/Button'
import { useEffect } from 'react'

export default() => {
    const {search} = useLocation()

    const searchParams = new URLSearchParams(search)

    const q = searchParams.get('q')

    const navigate = useNavigate()

    const handleLuckyClick = () => {
        navigate('/search?q=amfeelinglucky')
    }

    useEffect(() => {
        console.log('TODO call api to seach: ' + q)
    }, [q])

    return <>
        <Text> Search: {q}</Text>

        <Button onClick={handleLuckyClick}>I'm feeling lucky</Button>
        </>
}