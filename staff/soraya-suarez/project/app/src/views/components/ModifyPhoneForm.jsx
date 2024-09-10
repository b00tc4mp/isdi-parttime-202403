import { useState } from 'react'

import logic from '../../logic'

import Field from '../../components/core/Field'
import Button from '../../components/core/Button'
import SubmitButton from '../../components/core/SubmitButton'
import FormWithFeedback from '../../components/library/FormWithFeedback'
import View from '../../components/library/View'

import { SystemError } from 'com/errors'
import useContext from '../../useContext'

function ModifyPhoneForm({ user, onProcessFinished }) {
    const { alert } = useContext()

    const [message, setMessage] = useState('')

    const [inputPhone, setInputPhone] = useState(user.phone)
    const onInputPhoneChange = ({ target }) => {
        setInputPhone(target.value)
    }

    const handleCancelModifyPhoneClick = () => onProcessFinished()

    const handleModifyPhoneSubmit = event => {
        event.preventDefault()

        const form = event.target

        const phone = form.phone.value

        try {
            logic.modifyMyPhone(phone)
                .then(() => onProcessFinished())
                .catch(error => {
                    console.error(error)

                    if (error instanceof SystemError) {
                        alert(error.message)

                        return
                    }

                    setMessage(error.message)
                })
        } catch (error) {
            console.error(error)

            setMessage(error.message)
        }
    }

    return <div className='bg-white'>
        <FormWithFeedback onSubmit={handleModifyPhoneSubmit} message={message}>
            <Field id='phone' value={inputPhone} onChange={onInputPhoneChange}>Phone</Field>

            <View direction='row'>
                <Button onClick={handleCancelModifyPhoneClick}>Cancel</Button>
                <SubmitButton>Modify phone</SubmitButton>
            </View>
        </FormWithFeedback>
    </div>
}

export default ModifyPhoneForm