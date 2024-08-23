import { RiDeleteBin5Line } from "react-icons/ri";
import { FaEye } from "react-icons/fa6";
import { FaEyeSlash } from "react-icons/fa6";

import Button from '../../components/core/Button'
import Text from '../../components/core/Text'
import Confirm from './Confirm'
import UserView from './UserView'

import logic from '../../logic'
import { useState } from 'react'

import useContext from '../../useContext'

function User({ user, onUserRefreshed }) {
    const { alert } = useContext()

    const [viewUser, setViewUser] = useState(false)
    const handleViewUserClick = () => setViewUser(true)
    const handleProcessFinishClick = () => setViewUser(false)

    const [confirmDeleteVisible, setConfirmDeleteVisible] = useState(false)
    const handleDeleteUser = () => setConfirmDeleteVisible(true)

    const handleDeleteUserAccepted = () => {
        try {
            logic.deleteUser(user.id)
                .then(() => onUserRefreshed())
                .catch(error => {
                    console.error(error)

                    alert(error.message)
                })
        } catch (error) {
            console.error(error)

            alert(error.message)
        }
    }

    const handleDeleteUserCancelled = () => setConfirmDeleteVisible(false)

    return <div>
        <div className="flex items-center justify-between py-2 px-2">
            <Text>Name: {user.name}</Text>
            <div className="flex gap-2">
                {!viewUser && <Button className="border-none" onClick={handleViewUserClick}>{<FaEye />}</Button>}
                {viewUser && <Button className="border-none" onClick={handleProcessFinishClick}>{<FaEyeSlash />}</Button>}
                {logic.getUserRole() === 'admin' && <Button className="border-none" onClick={handleDeleteUser}>{<RiDeleteBin5Line/>}</Button>}
            </div>
        </div>

        {viewUser && <UserView user={user} onProcessFinished={handleProcessFinishClick} />}
        {confirmDeleteVisible && <Confirm message="Delete user?" onAccept={handleDeleteUserAccepted} onCancel={handleDeleteUserCancelled} />}
    </div>
}

export default User