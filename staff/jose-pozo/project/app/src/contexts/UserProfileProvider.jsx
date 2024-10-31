import { createContext, useContext, useState } from 'react'

export const UserProfileContext = createContext()

export const useUserProfileContext = () => useContext(UserProfileContext) // Hook propio creado para importar el contexto.

export const UserProfileProvider = ({ children }) => {
    const [selectedUserProfile, setSelectedUserProfile] = useState(null)
    const [showCompoUserProfile, setShowCompoUserProfile] = useState(false)

    const handleUserProfileClick = (customer) => {
        setSelectedUserProfile(customer)
        setShowCompoUserProfile(true)
    }

    return (
        <UserProfileContext.Provider value={{ showCompoUserProfile, setShowCompoUserProfile, selectedUserProfile, setSelectedUserProfile, handleUserProfileClick }}>
            {children}
        </UserProfileContext.Provider>
    )
}



