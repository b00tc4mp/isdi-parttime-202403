import { useState, useEffect } from 'react'
import logic from '../logic'

import { MdOutlineEdit } from "react-icons/md";
import { MdClose } from "react-icons/md";

import Button from '../components/core/Button'
import ModifyNameForm from './components/ModifyNameForm'
import ModifySurnameForm from './components/ModifySurnameForm'
import ModifyEmailForm from './components/ModifyEmailForm'
import ModifyPhoneForm from './components/ModifyPhoneForm'
import ModifyAvatarForm from './components/ModifyAvatarForm'
import ModifyPasswordForm from './components/ModifyPasswordForm'

import useContext from '../useContext'

function Profile(/*{ user }*/) {
    const { alert } = useContext()

    const [user, setUser] = useState([])

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

    const [modifySurnameForm, setModifySurnameForm] = useState(false)
    const handleModifySurnameClick = () => setModifySurnameForm(true)
    const handleProcessFinishSurnameClick = () => setModifySurnameForm(false)

    const [modifyEmailForm, setModifyEmailForm] = useState(false)
    const handleModifyEmailClick = () => setModifyEmailForm(true)
    const handleProcessFinishEmailClick = () => setModifyEmailForm(false)

    const [modifyPhoneForm, setModifyPhoneForm] = useState(false)
    const handleModifyPhoneClick = () => setModifyPhoneForm(true)
    const handleProcessFinishPhoneClick = () => setModifyPhoneForm(false)

    const [modifyAvatarForm, setModifyAvatarForm] = useState(false)
    const handleModifyAvatarClick = () => setModifyAvatarForm(true)
    const handleProcessFinishAvatarClick = () => setModifyAvatarForm(false)

    const [modifyPasswordForm, setModifyPasswordForm] = useState(false)
    const handleModifyPasswordClick = () => setModifyPasswordForm(true)
    const handleProcessFinishPasswordClick = () => setModifyPasswordForm(false)

    return <div className='content-center'>
        {user.avatar !== '' && <div>
            <div className='flex justify-center'>
                <img className='inline w-12' src={user.avatar}/>
            </div>

            <div className='flex justify-center border-b-2'>
                {!modifyAvatarForm && <Button className='border-0 text-indigo-300' onClick={()=> handleModifyAvatarClick()}>Edit photo/avatar</Button>}
                {modifyAvatarForm && <Button className='border-0 text-indigo-300' onClick={()=> handleProcessFinishAvatarClick()}>Cancel edit photo/avatar</Button>}
            </div>
        </div> }

        <div className='flex m-4 border-b-2 align-center'>
            <p className='font-bold pr-1'>Name:</p>
            <p>{user.name}</p>
            {!modifyNameForm && <Button className='border-0 ml-auto' onClick={()=> handleModifyNameClick()}>{<MdOutlineEdit />}</Button>}
            {modifyNameForm && <Button className='border-0 ml-auto' onClick={()=> handleProcessFinishNameClick()}>{<MdClose/>}</Button>}
       </div>

       <div className='flex m-4 border-b-2 align-center'>
            <p className='font-bold pr-1'>Surname:</p>
            <p>{user.surname}</p>
            {!modifySurnameForm && <Button className='border-0 ml-auto' onClick={()=> handleModifySurnameClick()}>{<MdOutlineEdit />}</Button>}
            {modifySurnameForm && <Button className='border-0 ml-auto' onClick={()=> handleProcessFinishSurnameClick()}>{<MdClose/>}</Button>}
       </div>

       <div className='flex m-4 border-b-2 align-center'>
            <p className='font-bold pr-1'>Email:</p>
            <p>{user.email}</p>
            {!modifyEmailForm && <Button className='border-0 ml-auto' onClick={()=> handleModifyEmailClick()}>{<MdOutlineEdit />}</Button>}
            {modifyEmailForm && <Button className='border-0 ml-auto' onClick={()=> handleProcessFinishEmailClick()}>{<MdClose />}</Button>}
       </div>

       {user.phone !== '' && <div className='flex m-4 border-b-2 align-center'>
            <p className='font-bold pr-1'>Phone:</p>
            <p>{user.phone}</p>
            {!modifyPhoneForm && <Button className='border-0 ml-auto' onClick={()=> handleModifyPhoneClick()}>{<MdOutlineEdit />}</Button>}
            {modifyPhoneForm && <Button className='border-0 ml-auto' onClick={()=> handleProcessFinishPhoneClick()}>{<MdClose />}</Button>}
       </div>}

       {user.phone === '' && <div className="flex m-4 justify-center">
            <Button className='border-0 ConfirmButton' onClick={()=> handleModifyPhoneClick()}>Add phone</Button>
       </div>}

       {user.avatar === '' && <div className="flex m-4 justify-center">
            <Button className='border-0 ConfirmButton' onClick={()=> handleModifyAvatarClick()}>Add photo/avatar</Button>
       </div>}

       <div className='flex m-4 justify-center'>
            <Button className='border-0 ConfirmButton' onClick={()=> handleModifyPasswordClick()}>Change Password</Button>
       </div>

        {modifyNameForm && <ModifyNameForm  user={user} onProcessFinished={handleProcessFinishNameClick} />}
        {modifySurnameForm && <ModifySurnameForm  user={user} onProcessFinished={handleProcessFinishSurnameClick} />}
        {modifyEmailForm && <ModifyEmailForm  user={user} onProcessFinished={handleProcessFinishEmailClick} />}
        {modifyPhoneForm && <ModifyPhoneForm  user={user} onProcessFinished={handleProcessFinishPhoneClick} />}
        {modifyAvatarForm && <ModifyAvatarForm  user={user} onProcessFinished={handleProcessFinishAvatarClick} />}
        {modifyPasswordForm && <ModifyPasswordForm  user={user} onProcessFinished={handleProcessFinishPasswordClick} />}
    </div>
}

export default Profile