import { useState } from 'react'

import Button from '../components/core/Button'
import AllUsersList from './components/AllUsersList'
import AvailableUserList from './components/AvailableUserList'

function Users() {
    const [page, setPage] = useState('')
    
    const handleNavigateTo = (url) => setPage(url)
    
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
    </div>
}

export default Users