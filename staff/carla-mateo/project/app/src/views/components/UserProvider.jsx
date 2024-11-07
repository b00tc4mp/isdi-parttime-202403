import { useState, useEffect } from 'react'
import logic from '../../logic/index'
import useContext from '../../useContext'

function UserProvider({ children, refreshStamp }) {
    const { alert } = useContext()

    const [user, setUser] = useState(null)
    const [isAdmin, setAdmin] = useState(false)

    useEffect(() => {
        try {
            logic.getUsername()
                .then(user => {
                    setUser(user)
                })
                .catch((error) => {
                    if (error instanceof SystemError) {
                        alert(error.message)
                    }
                    alert("Not found")
                })
            const role = logic.getUserRole()
            setAdmin(role === 'admin')
        } catch (error) {
            console.error(error.message)
            setMessage(error.message)
        }
    }, [refreshStamp])

    return children({ user, isAdmin })
}

export default UserProvider

