import { useState, useEffect } from 'react'
import logic from '../../logic/index'

function UserProvider({ children }) {
    const [user, setUser] = useState(null)
    const [isAdmin, setAdmin] = useState(false)

    useEffect(() => {
        try {
            logic.getUsername()
                .then(user => {
                    setUser(user)
                })
                .catch((error) => alert('Failed to get user name: ' + error.message))

            const role = logic.getUserRole()
            setAdmin(role === 'admin')
        } catch (error) {
            alert('Failed to get user role: ' + error.message)
        }
    }, [])


    return children({ user, isAdmin })
}

export default UserProvider

