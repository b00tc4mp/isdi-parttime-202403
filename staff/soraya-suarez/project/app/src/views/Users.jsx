import { useState } from 'react'

import Button from '../components/core/Button'
import AllUsersList from './components/AllUsersList'
import AvailableUserList from './components/AvailableUserList'

import Enroll from './Enroll'

import logic from '../logic'

function Users() {
    const [page, setPage] = useState('')
    const [enrollUserForm, setEnrollUserForm] = useState(false)
    
    const handleNavigateTo = (url) => setPage(url)

    const handleEnrollUser = () => setEnrollUserForm(true)
    const handleProcessFinishClick = () => setEnrollUserForm(false)
    
    return <div className="overflow-scroll my-4">
        <nav className="flex justify-center text-xs w-screen">
            <Button className="border-gray-300 rounded-tr-none rounded-br-none" onClick={()=> handleNavigateTo('all-users')}>All users</Button>
            <Button className="border-gray-300 rounded-none" onClick={()=> handleNavigateTo('available-users')}>Available users</Button>
        </nav>

        { (() => {
        switch (page) {
            case 'all-users': return <AllUsersList/>
            case 'available-users': return <AvailableUserList/>
            default: return null
        }
        }) () }

        <div className="flex justify-center items-center mt-4">
            {logic.getUserRole() === 'admin' && <Button onClick={()=> handleEnrollUser()}>Enroll user</Button>}
        </div>

        <div>
            {enrollUserForm && <Enroll onProcessFinished={handleProcessFinishClick()} />}
        </div>
    </div>
}
export default Users