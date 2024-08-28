import { useState } from 'react'

import logic from '../../../logic/index'

import { RiMenuAddFill } from "react-icons/ri"

import Heading from '../../../components/core/Heading'
import Time from '../../../components/core/Time'
import Confirm from '../Confirm'
import UpdateTaskDescription from './UpdateTaskDescription'

function Task({ task, onTaskDeleted, onTaskDoneToggled, onEditSuccess }) {
    const [showConfirm, setShowConfirm] = useState(false)
    const [showOptions, setShowOptions] = useState(false)
    const [showDescription, setShowDescription] = useState(false)
    const [showEditForm, setShowEditForm] = useState(false)
    const [currentTask, setCurrentTask] = useState(task)

    const Options = () => {
        setShowOptions(!showOptions)
    }
    const handleDeleteTask = () => {
        setShowConfirm(true)
        setShowOptions(false)
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

    const handleEditTask = () => {
        setShowEditForm(true)
        setShowOptions(false)
    }

    const handleUpdateTaskSuccess = () => {

        onEditSuccess()

        setShowEditForm(false)

    }

    const userCanToggleTask = () => {
        const userId = logic.getUserId()
        return !task.assignee || task.assignee._id === userId
    }

    return <div>
        <div className='flex flex-row justify-between items-center space-x-4 m-4 text-sm ml-8'>
            <div className='flex flex-col w-20'>
                <Heading className='text-2xl truncate' level='1'>{task.title}</Heading>
            </div>
            <button className='text-2xl w-5' onClick={() => setShowDescription(!showDescription)}>
                {showDescription ? '-' : '+'}
            </button>
            <Time className='ml-4'>{task.date}</Time>
            <div className='flex flex-col ml-4'>
                <Heading className=' w-10 truncate' level='1'>{task.assignee ? task.assignee.username : ''}</Heading>
            </div>
            <div>
                {userCanToggleTask() && (
                    <button onClick={handleToggleDoneTask} className={`w-5 h-5 text-2xl flex items-center justify-center  ${task.done ? ' text-lime-300 ' : 'text-green-950'} `}>
                        {task.done ? '☑' : '☐'}
                    </button>
                )}
            </div>
            <div className='relative'>
                <button onClick={Options} className='text-xl'>
                    <RiMenuAddFill />
                </button>
                {showOptions && (
                    <div className='absolute right-0 mt-2 w-36 p-2 bg-green-100 border border-black shadow-lg rounded z-50 ' >
                        <button
                            onClick={handleDeleteTask}
                            className='mt-2 p-1 text-sm wm-2 w-32 border-t border-green-800'
                        >
                            Delete Task
                        </button>
                        <button
                            onClick={handleEditTask}
                            className='p-1 mt-2 w-32 text- border-t border-green-800'
                        >
                            Edit Task
                        </button>
                    </div>
                )}
            </div>
        </div>
        {showDescription && (
            <div className='flex-1 max-w-full ml-4 '>
                {task.description}
            </div>
        )}
        {showConfirm && (
            <Confirm
                message="Are you sure you want to delete this task?"
                onConfirm={handleConfirmDelete}
                onCancel={handleCancelDelete}
            />
        )}
        {showEditForm && (
            <UpdateTaskDescription
                onEditSuccess={handleUpdateTaskSuccess}
                onCancelEditSuccess={() => setShowEditForm(false)}
                task={currentTask}
            />
        )}
    </div>
}
export default Task
