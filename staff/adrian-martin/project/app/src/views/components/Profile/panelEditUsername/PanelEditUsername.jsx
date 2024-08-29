import { useEffect, useState } from 'react'

import useContext from '../../../useContext'
import extractPayloadFromJWT from '../../../../util/extractPayloadFromJWT'

import logic from '../../../../logic/index'
import Form from '../../../../components/core/Form/Form'
import Input from '../../../../components/core/Input/Input'
import Button from '../../../../components/core/Button/Button'

import './PanelEditUsername.css'

function PanelEditUsername({ onClose, onUsernameUpdated }) {
    const [username, setUsername] = useState('')
    const { alert } = useContext()
    const handleCancelCreatePostClick = () => onClose()

    let payLoad

    try {
        if (sessionStorage.token)
            payLoad = extractPayloadFromJWT(sessionStorage.token)

    } catch (error) {
        alert(error.message)
    }

    const { sub: userId } = payLoad

    const handleEditUsername = event => {
        event.preventDefault()

        const target = event.target
        const username = target.username.value

        logic.editUsername(userId, username)
            .then(username => {
                setUsername(username)
                onUsernameUpdated()
                onClose()
            })
            .catch(error => {
                alert(error.message)
            })
    }

    return (

        <div className='Panel-username'>
            <Form className='Panel' onSubmit={handleEditUsername} >
                <Input className='Input-panel'
                    id='username'
                    type='text'
                    placeholder='New Username'
                />

                <div className='Chance-cancel'>
                    <Button className='Button-panel' onClick={handleCancelCreatePostClick} type='button' >
                        Cancel
                    </Button>

                    <Button className='Button-panel' type='submit'>
                        Confirm
                    </Button>
                </div>
            </Form>
        </div>
    )
}

export default PanelEditUsername