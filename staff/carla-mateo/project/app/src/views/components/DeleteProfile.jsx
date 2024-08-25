import { useState, useEffect } from 'react'

import { TiArrowBack } from 'react-icons/ti'

import Button from '../../components/core/Button'
import Confirm from './Confirm'
import logic from '../../logic/index'

const DeleteProfile = ({ onDeleteSuccess }) => {
    const [users, setUsers] = useState([])
    const [showDeleteConfirm, setShowDeleteConfirm] = useState(false)
    const [selectedUser, setSelectedUser] = useState(null)

    useEffect(() => {
        try {
            logic.getAllUsers()
                .then((users) => setUsers(users))
                .catch(error => {
                    console.error(error)
                    alert(error.message)
                })
        } catch (error) {
            console.error(error)
            alert(error.message)
        }
    }, [])
    const confirmDeleteProfile = () => {
        try {
            logic.deleteProfile(selectedUser.id)
                .then(() => {
                    setShowDeleteConfirm(false)
                    setSelectedUser(null)
                    setUsers([])
                    onDeleteSuccess()
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

    const handleDeleteProfile = () => {
        onDeleteSuccess()

    }

    return (
        <>
            {users.length > 0 && (
                <div className='absolute top-20 left-10 p-2 bg-green-100 border border-green-800 shadow-lg'>
                    <h2>Select a user to delete:</h2>
                    <ul>
                        {users.map(user => (
                            <li key={user.id} value={user.id} className='m-2 w-32 border-t border-green-800' onClick={() => {
                                setSelectedUser(user)
                                setShowDeleteConfirm(true)
                            }}>
                                {user.username}
                            </li>
                        ))}
                    </ul>
                    <div className='flex justify-end'>
                        <Button onClick={handleDeleteProfile}>{<TiArrowBack size={20} />}</Button>
                    </div>
                </div>
            )}

            {showDeleteConfirm && selectedUser && (
                <Confirm
                    message={`Are you sure you want to delete ${selectedUser.username}?`}
                    onConfirm={confirmDeleteProfile}
                    onCancel={() => setShowDeleteConfirm(false)}
                />
            )}
        </>
    )
}

export default DeleteProfile