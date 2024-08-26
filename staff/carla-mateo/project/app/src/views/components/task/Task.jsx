import { useState } from 'react'

import logic from '../../../logic/index'

import { RiMenuAddFill } from "react-icons/ri"

import Heading from '../../../components/core/Heading'
import Time from '../../../components/core/Time'
import Button from '../../../components/core/Button'
import Confirm from '../Confirm'

function Task({ task, onTaskDeleted, onTaskDoneToggled }) {
    const [showConfirm, setShowConfirm] = useState(false)
    const [showOptions, setShowOptions] = useState(false)
    const [showDescription, setShowDescription] = useState(false)

    const Options = () => {
        setShowOptions(!showOptions);
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

    const userCanToggleTask = () => {
        const userId = logic.getUserId()
        return !task.assignee || task.assignee._id === userId
    }

    return <div>
        <div className='flex flex-row justify-between items-center space-x-4 m-4 text-sm ml-8'>
            <div className='flex flex-col w-'>
                <Heading className='text-xl' level='1'>{task.title}</Heading>
            </div>
            <button onClick={() => setShowDescription(!showDescription)}>
                {showDescription ? '-' : '+'}
            </button>
            <Time className='ml-4'>{task.date}</Time>
            <div className='flex flex-col ml-4'>
                <Heading level='1'>{task.assignee ? task.assignee.username : ''}</Heading>
            </div>
            <div>
                {userCanToggleTask() && (
                    <button onClick={handleToggleDoneTask} className={`w-5 h-5 text-2xl flex items-center justify-center ${task.done ? ' text-lime-300 ' : 'text-green-950'
                        } `}>
                        {task.done ? '☑' : '☐'}
                    </button>
                )}
            </div>
            <div className='relative'>
                <button onClick={Options} className='text-xl'>
                    <RiMenuAddFill />
                </button>
                {showOptions && (
                    <div className='absolute right-0 mt-2 w-36 bg-green-100 border border-green-800 shadow-lg rounded'>
                        <button
                            onClick={handleDeleteTask}
                            className=' w-full text-left px-4 py-2 hover:bg-green-100 text-color-footer'
                        >
                            Delete Task
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

    </div>
}
export default Task
