import './index.css'

import Text from '../../../components/core/Text'
import Button from '../../../components/core/Button'
import View from '../../../components/library/View'
import { Link } from 'react-router-dom'

//TODO podria hacer un form con 4 border radius para mejorar la experiencia de usuario
function SelectActivity() {

    return <View tag='main' className='SelectActivity'>
        <Text>Select the activity</Text>
        <Button type='button'><Link to='/activities/create/completeSentence'>Complete the sentence</Link></Button>
        <Button type='button'><Link to='/activities/create/orderSentence'>Order the sentence</Link></Button>
        <Button type='button'><Link to='/activities/create/vocabulary'>Vocabulary</Link></Button>
        <Button type='button'><Link to='/'>Back to home</Link></Button>
    </View>
}

export default SelectActivity
