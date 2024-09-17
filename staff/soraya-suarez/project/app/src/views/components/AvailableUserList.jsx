import { useState, useEffect } from 'react'

import User from '../components/User'

import logic from '../../logic'

import useContext from '../../useContext'

function AvailableUserList() {
    const { alert } = useContext()

    const [users, setUsers] = useState([])

    useEffect(() => {
        loadUsers()
    })

    const loadUsers = () => {
        try {
            logic.getAvalableUsers()
                .then(users => {
                    setUsers(users)
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
    
    const handleRefresh = () => loadUsers()

    return <div tag='section'>
        {users.map(user => <User key={user.id} user={user} onUserRefreshed={handleRefresh}/>)}
    </div>
}

export default AvailableUserList