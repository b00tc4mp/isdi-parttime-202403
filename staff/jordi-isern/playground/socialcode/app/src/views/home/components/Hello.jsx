import {useParams} from 'react-router-dom'
import Text from '../../../Components/Core/Text'

export default() => {
    const{to} = useParams()

    return <Text> Hello, {to}!</Text>
}