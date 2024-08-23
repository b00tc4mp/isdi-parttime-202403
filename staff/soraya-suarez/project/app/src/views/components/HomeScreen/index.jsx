import { useState } from 'react'

import Button from '../../../components/core/Button'
import MyTaskList from '../MyTasksList'
import MyInProgressTaskList from '../MyInProgressTaskList'
import MyPrivateTaskList from '../MyPrivateTaskList'
import MyFinishedTaskList from '../MyFinishedTaskList'

function HomeScreen () {
    const [page, setPage] = useState('')
    
    const handleNavigateTo = (url) => setPage(url)

    return <div className="overflow-scroll my-4">
            <nav className="flex justify-center text-xs w-screen">
                <Button className="border-gray-300 rounded-tr-none rounded-br-none" onClick={()=> handleNavigateTo('my-tasks')}>My tasks</Button>
                <Button className="border-gray-300 rounded-none" onClick={()=> handleNavigateTo('in-progress')}>In progress</Button>
                <Button className="border-gray-300 rounded-none" onClick={()=> handleNavigateTo('private')}>Private</Button>
                <Button className="border-gray-300 rounded-tl-none rounded-bl-none" onClick={()=> handleNavigateTo('finished')}>Finished</Button>
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