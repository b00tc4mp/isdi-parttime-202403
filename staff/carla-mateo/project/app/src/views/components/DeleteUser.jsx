import { useState, useEffect } from 'react'

import { TiArrowBack } from 'react-icons/ti'

import Button from '../../components/core/Button'
import logic from '../../logic/index'
const DeleteUser = ({ onDeleteSuccess }) => {
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
    const confirmDeleteUser = () => {
        try {
            logic.deleteUser(selectedUser.id)
                .then(() => {
                    setShowDeleteConfirm(false)
                    setSelectedUser(null)
                    setUsers([])
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

    const handleDeleteUser = () => {
        onDeleteSuccess()

    }

    return (
        <>
            {users.length > 0 && (
                <div className="absolute top-20 left-10 p-2 bg-green-100 border border-green-800 shadow-lg">
                    <h2>Select a user to delete:</h2>
                    <ul>
                        {users.map(user => (
                            <li key={user.id} value={user.id} className="m-2 w-32 border-t border-green-800" onClick={() => {
                                setSelectedUser(user)
                                setShowDeleteConfirm(true)
                            }}>
                                {user.username}
                            </li>
                        ))}
                    </ul>
                    <div className="flex justify-end">
                        <Button onClick={handleDeleteUser}>{<TiArrowBack size={20} />}</Button>
                    </div>
                </div>
            )}

            {showDeleteConfirm && (
                <div className="fixed top-0 left-0 w-full h-full flex justify-center items-center bg-gray-800 bg-opacity-75">
                    <div className="bg-green-100 border border-green-800 p-4 rounded shadow-lg">
                        <p>Are you sure you want to delete {selectedUser.username}?</p>
                        <div className="flex justify-end space-x-4">
                            <Button onClick={() => setShowDeleteConfirm(false)}>Cancel</Button>
                            <Button onClick={confirmDeleteUser}>Confirm</Button>
                        </div>
                    </div>
                </div>
            )}
        </>
    )
}

export default DeleteUser