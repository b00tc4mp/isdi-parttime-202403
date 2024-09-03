import { useState, useEffect } from 'react'
import logic from '../logic'

import { MdOutlineEdit } from "react-icons/md";

import Button from '../components/core/Button'
import Field from '../components/core/Field'
import SubmitButton from '../components/core/SubmitButton'
import FormWithFeedback from '../components/library/FormWithFeedback'
import View from '../components/library/View'
import ModifyUserForm from './components/ModifyUserForm'
import ModifyNameForm from './components/ModifyNameForm'

import useContext from '../useContext'

function Profile() {
    const { alert } = useContext()

    const [user, setUser] = useState([])

    //const [modifyUserForm, setModifyUserForm] = useState(false)

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

    const [modifyNameForm, setModifyNameForm] = useState(false)
    const handleModifyNameClick = () => setModifyNameForm(true)
    const handleProcessFinishNameClick = () => setModifyNameForm(false)

    /*const handleModifyUserClick = () => setModifyUserForm(true)

    const handleProcessFinishClick = () => setModifyUserForm(false)*/

    return <>
        <div className="flex m-4">
           <p>{user.name}</p>
           <Button className="border-0" onClick={()=> handleModifyNameClick()}>{<MdOutlineEdit />}</Button>
       </div>
        

        {modifyNameForm && <ModifyNameForm  user={user} onProcessFinished={handleProcessFinishNameClick} />}
    </>
}

export default Profile