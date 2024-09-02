import { useState, useEffect } from 'react'
import logic from '../logic'

import Button from '../components/core/Button'
import ModifyUserForm from './components/ModifyUserForm'

import useContext from '../useContext'

function Profile() {
    const { alert } = useContext()

    const [user, setUser] = useState([])

    const [modifyUserForm, setModifyUserForm] = useState(false)

    useEffect(() => {
        loadUser()
    })

    const loadUser = () => {
        try {
            logic.getMyProfile()
                .then(user => {
                    setUser(user)
                })
                .catch(error => {
                    console.error(error)
                    alert(error.message)
                })
        } catch (error) {
            console.error(error)

            alert(error.message)
        }
    }

    const handleModifyUserClick = () => setModifyUserForm(true)

    const handleProcessFinishClick = () => {
        setModifyUserForm(false)
        loadUser()
    }

    return <>
        {modifyUserForm && <ModifyUserForm user={user} onProcessFinished={handleProcessFinishClick} />}

        {!modifyUserForm && <Button className="ConfirmButton" onClick={()=> handleModifyUserClick()}>Edit profile</Button>}
    </>
    
}

export default Profile