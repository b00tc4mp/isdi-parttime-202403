import { useParams } from 'react-router-dom'
import Text from '../../components/core/Text'

export default () => {
    const { to } = useParams()

    return <Text className="mt-10 p-10">Hello, {to}!</Text>
}