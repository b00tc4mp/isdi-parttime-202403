import { useEffect, useState } from 'react'

import extractPayloadFromJWT from '../../../util/extractPayloadFromJWT'

import logic from '../../../logic'
import FormWithFeedback from '../../../components/library/FormWithFeedback/FormWithFeedback'
import Button from '../../../components/core/Button/Button'

import './PanelEditUsername.css'

function PanelEditUsername({ onClose, setStamp }) {
    const [username, setUsername] = useState('')

    const handleCancelCreatePostClick = () => onClose()

    let payLoad

    try {
        if (sessionStorage.token)
            payLoad = extractPayloadFromJWT(sessionStorage.token)

    } catch (error) {
        alert(message.error)
    }

    const { sub: userId } = payLoad

    const handleEditUsername = event => {
        event.preventDefault()

        const target = event.target

        const username = target.username.value

        logic.editUsername(userId, username)
            .then(username => {
                setUsername(username)
                setStamp(Date.now())
                onClose()
            })
            .catch(error => {
                console.error(error)
            })
    }

    return (

        <div className='Panel-username'>
            <FormWithFeedback className='Panel' onSubmit={handleEditUsername} >
                <input className='Input-panel'
                    id='username'
                    type='text'
                    placeholder='New Username'
                />

                <div className='Change-cancel'>
                    <Button className='Button-panel' onClick={handleCancelCreatePostClick} type='button' >
                        Cancel
                    </Button>

                    <Button className='Button-panel' type='submit'>
                        Confirm
                    </Button>
                </div>
            </FormWithFeedback>
        </div>
    )
}

export default PanelEditUsername