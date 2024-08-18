import { useState, useEffect } from 'react'
import logic from '../../logic/index'

function UserProvider({ children }) {
    const [user, setUser] = useState(null)
    const [isAdmin, setAdmin] = useState(false)

    useEffect(() => {
        try {
            logic.getUserName()
                .then(user => {
                    setUser(user)
                    setAdmin(user?.role === 'admin')
                })
                .catch((error) => alert(error.message))
        } catch (error) {
            alert(error.message)
        }
    }, []);


    return children({ user, isAdmin })
}

export default UserProvider