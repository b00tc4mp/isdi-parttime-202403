
import logic from '../../../logic'

import View from '../../library/View'

import Heading from '../../../components/core/Heading'

import Time from '../../../components/core/Time'

import Button from '../../../components/core/Button'


function Task({ task, onTaskDeleted }) {
    const handleDeleteTask = () => {
        if (confirm('Delete task?'))
            try {
                logic.deleteTask(task.id)
                    .then(() => onTaskDeleted())
                    .catch(error => {
                        console.error(error)
                        alert(error.message)
                    })
            } catch (error) {
                console.error(error)
                alert(error.message)
            }
    }


    return <View>
        <div className='flex flex-row justify-between items-center space-x-4 m-4 text-sm ml-8'>
            <div className="flex flex-col w-">
                <Heading level="2">{task.title}</Heading>
                <Heading level="1">{task.description}</Heading>
            </div>
            <Time className="ml-4">{task.date}</Time>
            <div className="flex flex-col ml-4">
                <Heading level="1">{task.assignee ? task.assignee.username : ''}</Heading>
            </div>
            <div className="ml-auto">
                <Button onClick={handleDeleteTask}>Delete</Button>
            </div>
        </div>
    </View>
}
export default Task
