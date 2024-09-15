import { createContext, useContext, useState } from 'react'

export const AppointmentsContext = createContext()

export const useAppointmentsContext = () => useContext(AppointmentsContext) // Hook propio creado para importar el contexto.

export const AppointmentsProvider = ({ children }) => {
    const [appointments, setAppointments] = useState([])

    return (
        <AppointmentsContext.Provider value={{ appointments, setAppointments }}>
            {children}
        </AppointmentsContext.Provider>
    )
}
