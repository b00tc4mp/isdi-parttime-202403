import { useState } from 'react'

import logic from '../../../logic/index'

import View from '../../library/View'

import Heading from '../../../components/core/Heading'
import Time from '../../../components/core/Time'
import Button from '../../../components/core/Button'
import Confirm from '../Confirm'

function Task({ task, onTaskDeleted, onTaskDoneToggled }) {
    const [showConfirm, setShowConfirm] = useState(false)

    const handleDeleteTask = () => {
        setShowConfirm(true)
    }

    const handleConfirmDelete = () => {
        try {
            logic.deleteTask(task.id)
                .then(() => {
                    onTaskDeleted()
                    setShowConfirm(false)
                })
                .catch(error => {
                    console.error(error)
                    alert(error.message)
                    setShowConfirm(false)
                })
        } catch (error) {
            console.error(error)
            alert(error.message)
            setShowConfirm(false)
        }
    }

    const handleCancelDelete = () => {
        setShowConfirm(false)
    }

    const handleToggleDoneTask = () => {
        try {
            logic.toggleDoneTask(task.id)
                .then(() => onTaskDoneToggled())
                .catch(error => {
                    console.error(error)
                    alert(error.message)
                })
        } catch (error) {
            console.error(error)
            alert(error.message)
        }
    }

    const userCanToggleTask = () => {
        const userId = logic.getUserId()
        return !task.assignee || task.assignee.id === userId
    }

    return <View>
        <div className='flex flex-row justify-between items-center space-x-4 m-4 text-sm ml-8'>
            <div className='flex flex-col w-'>
                <Heading className='text-xl' level='1'>{task.title}</Heading>
                <Heading level='1'>{task.description}</Heading>
            </div>
            <Time className='ml-4'>{task.date}</Time>
            <div className='flex flex-col ml-4'>
                <Heading level='1'>{task.assignee ? task.assignee.username : ''}</Heading>
            </div>
            <div>
                {userCanToggleTask() && (
                    <button onClick={handleToggleDoneTask} className={`w-8 h-8 text-xl flex items-center justify-center ${task.done ? 'text-green-950' : 'text-lime-500'
                        } `}>
                        {task.done ? '☐' : '☑'}
                    </button>
                )}
            </div>
            <div className='ml-auto'>
                <Button onClick={handleDeleteTask}>Delete</Button>
            </div>
        </div>
        {showConfirm && (
            <Confirm
                message="Are you sure you want to delete this task?"
                onConfirm={handleConfirmDelete}
                onCancel={handleCancelDelete}
            />
        )}
    </View>
}
export default Task
