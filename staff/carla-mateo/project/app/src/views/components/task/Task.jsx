import { useState } from 'react'

import logic from '../../../logic/index'

import { RiMenuAddFill } from "react-icons/ri"

import Heading from '../../../components/core/Heading'
import Time from '../../../components/core/Time'
import Confirm from '../Confirm'
import UpdateTaskDescription from './UpdateTaskDescription'
import UserProvider from '../UserProvider'

function Task({ task, onTaskDeleted, onTaskDoneToggled, onEditSuccess }) {
    const [showConfirm, setShowConfirm] = useState(false)
    const [showOptions, setShowOptions] = useState(false)
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
        <UserProvider>
            {({ isAdmin }) => (
                <div className='flex flex-col mt-2 overflow-y-auto w-full p-4'>
                    <div className='flex justify-center items-center shadow-xl bg-green-200 rounded-xl p-1 pr-2 pl-2'>
                        <button onClick={Options} className='mr-2 text-2xl self-center'>
                            <RiMenuAddFill />
                        </button>
                        <div className='ml-2 mr-2 '>
                            <Heading className='' level='1'>{task.title} : </Heading>
                            <div>
                                <Time>{task.date}</Time>
                            </div>
                        </div>
                        <div className='ml-2 mr-2'>
                            - {task.description}
                        </div>
                        <Heading className='ml-2' level='1'>{task.assignee ? task.assignee.username : ''}</Heading>
                        <div className='ml-auto'>
                            {userCanToggleTask() && (
                                <button onClick={handleToggleDoneTask} className={`text-2xl ${task.done ? 'text-lime-800' : 'text-green-950'}`}>
                                    {task.done ? '☑' : '☐'}
                                </button>
                            )}
                        </div>
                    </div>
                    {showOptions && (
                        <div className='absolute mt-12 w-36 p-2 bg-green-100 border border-black shadow-lg rounded z-50'>
                            {isAdmin && (
                                <button
                                    onClick={handleDeleteTask}
                                    className='mt-2 p-1 text-sm w-32 border-t border-green-800'
                                >
                                    Delete Task
                                </button>
                            )}
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
            )}
        </UserProvider>
    )

}
export default Task
