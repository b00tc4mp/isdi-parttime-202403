import { useState } from 'react'

import Button from '../../../components/core/Button'
import MyTaskList from '../MyTasksList'
import MyInProgressTaskList from '../MyInProgressTaskList'
import MyPrivateTaskList from '../MyPrivateTaskList'
import MyFinishedTaskList from '../MyFinishedTaskList'

import './index.css'

function HomeScreen () {
    const [page, setPage] = useState('')
    
    const handleNavigateTo = (url) => setPage(url)

    return <div>
            <nav className='flex justify-center text-xs w-screen'>
                {page === 'my-tasks' && <Button className="btn-nav border-indigo-300 rounded-tr-none rounded-br-none bg-indigo-200" onClick={()=> handleNavigateTo('my-tasks')}>My tasks</Button>}
                {page !== 'my-tasks' && <Button className="btn-nav border-gray-300 rounded-tr-none rounded-br-none" onClick={()=> handleNavigateTo('my-tasks')}>My tasks</Button>}
                
                {page === 'in-progress' && <Button className="btn-nav border-indigo-300 rounded-none bg-indigo-200" onClick={()=> handleNavigateTo('in-progress')}>In progress</Button>}
                {page !== 'in-progress' && <Button className="btn-nav border-gray-300 rounded-none" onClick={()=> handleNavigateTo('in-progress')}>In progress</Button>}
                
                {page === 'private' && <Button className="btn-nav border-indigo-300 rounded-none bg-indigo-200" onClick={()=> handleNavigateTo('private')}>Private</Button>}
                {page !== 'private' && <Button className="btn-nav border-gray-300 rounded-none" onClick={()=> handleNavigateTo('private')}>Private</Button>}
                
                {page === 'finished' && <Button className="btn-nav border-indigo-300 rounded-tl-none rounded-bl-none bg-indigo-200" onClick={()=> handleNavigateTo('finished')}>Finished</Button>}
                {page !== 'finished' && <Button className="btn-nav border-gray-300 rounded-tl-none rounded-bl-none" onClick={()=> handleNavigateTo('finished')}>Finished</Button>}
            </nav>

            { (() => {
            switch (page) {
                case 'my-tasks': return <MyTaskList/>
                case 'in-progress': return <MyInProgressTaskList/>
                case 'private': return <MyPrivateTaskList/>
                case 'finished': return <MyFinishedTaskList/>
                default: return null
            }
            }) () }
    </div>
}

export default HomeScreen