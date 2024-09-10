import { useState } from 'react'

import logic from '../../logic'

import Field from '../../components/core/Field'
import Button from '../../components/core/Button'
import SubmitButton from '../../components/core/SubmitButton'
import FormWithFeedback from '../../components/library/FormWithFeedback'
import View from '../../components/library/View'

import { SystemError } from 'com/errors'
import useContext from '../../useContext'

function ModifySurnameForm({ user, onProcessFinished }) {
    const { alert } = useContext()

    const [message, setMessage] = useState('')

    const [inputSurname, setInputSurname] = useState(user.surname)
    const onInputSurnameChange = ({ target }) => {
        setInputSurname(target.value)
    }

    const handleCancelModifySurnameClick = () => onProcessFinished()

    const handleModifySurnameSubmit = event => {
        event.preventDefault()

        const form = event.target

        const surname = form.surname.value

        try {
            logic.modifyMySurname(surname)
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
        <FormWithFeedback onSubmit={handleModifySurnameSubmit} message={message}>
            <Field id='surname' value={inputSurname} onChange={onInputSurnameChange}>Surname</Field>

            <View direction='row'>
                <Button onClick={handleCancelModifySurnameClick}>Cancel</Button>
                <SubmitButton>Modify surname</SubmitButton>
            </View>
        </FormWithFeedback>
    </div>
}

export default ModifySurnameForm