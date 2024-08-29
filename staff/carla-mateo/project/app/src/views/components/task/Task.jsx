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

    return (
        <div className='relative flex flex-col  m-4 text-sm ml-8'>
            <div className='flex flex-row items-start justify-between space-x-4 w-full'>
                <button onClick={Options} className='text-xl'>
                    <RiMenuAddFill />
                </button>
                <div className='flex flex-grow flex-col'>
                    <Heading className='text-sm border-b-2 w-20 truncate' level='1'>{task.title} : </Heading>
                    <div className='flex mt-2 '>
                        <Time>{task.date}</Time>
                    </div>
                </div>
                <div className='text-sm'>
                    {task.description}
                </div>
                <Heading className='w-15' level='1'>{task.assignee ? task.assignee.username : ''}</Heading>
                <div className='ml-auto'>
                    {userCanToggleTask() && (
                        <button onClick={handleToggleDoneTask} className={`w-5 h-5 text-2xl flex justify-end  right-0 ${task.done ? 'text-lime-300' : 'text-green-950'}`}>
                            {task.done ? '☑' : '☐'}
                        </button>
                    )}
                </div>
            </div>
            {showOptions && (
                <div className='absolute left-0 top-full mt-2 w-36 p-2 bg-green-100 border border-black shadow-lg rounded z-50'>
                    <button
                        onClick={handleDeleteTask}
                        className='mt-2 p-1 text-sm w-32 border-t border-green-800'
                    >
                        Delete Task
                    </button>
                    <button
                        onClick={handleEditTask}
                        className='p-1 mt-2 w-32 border-t border-green-800'
                    >
                        Edit Task
                    </button>
                </div>
            )}
            {showConfirm && (
                <Confirm
                    message="Do you want to delete this task?"
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
    )
}
export default Task
