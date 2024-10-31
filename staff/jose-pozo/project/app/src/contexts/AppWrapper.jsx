import { Context } from './UseContext'
import { UserProfileProvider } from './UserProfileProvider'
import { AppointmentsProvider } from './AppointmentsProvider'

export const AppWrapper = ({ children, handleMessage }) => (
    <Context.Provider value={{ alert: handleMessage }}>
        <UserProfileProvider>
            <AppointmentsProvider>
                {children}
            </AppointmentsProvider>
        </UserProfileProvider>
    </Context.Provider>
);