import { RiDeleteBin5Line } from "react-icons/ri";
import { FaEye } from "react-icons/fa6";
import { FaEyeSlash } from "react-icons/fa6";
import { MdOutlineEdit } from "react-icons/md";
import { SlOptions } from "react-icons/sl";

import Button from '../../components/core/Button'
import Text from '../../components/core/Text'
import Confirm from './Confirm'
import FinishTaskForm from './FinishTaskForm'
//import ModifyDefinitionTaskForm from './ModifyDefinitionTaskForm'
//import ModifyStatusOrObervationTaskForm from './ModifyStatusOrObservationTaskForm'
import ReleaseTaskForm from './ReleaseTaskForm'
import TaskView from './TaskView'
import ModifyTaskForm from './ModifyTaskForm'

import logic from '../../logic'
import { useState } from 'react'

import useContext from '../../useContext'

function Task({ task, onTaskRefreshed }) {
    const { alert } = useContext()

    const [viewTask, setViewTask] = useState(false)
    const handleViewTaskClick = () => setViewTask(true)
    const handleProcessFinishClick = () => setViewTask(false)

    const [viewOptions, setViewOptions] = useState(false)
    const handleViewOptionsClick = () => setViewOptions(true)
    const handleProcessFinishOptionsClick = () => setViewOptions(false)

    const [form, setForm] = useState('')
    const handleSetForm = (url) => setForm(form)

    const [modifyTaskForm, setModifyTaskForm] = useState(false)
    const handleModifyTaskClick = () => setModifyTaskForm(true)
    const handleProcessFinishTaskClick = () => setModifyTaskForm(false)
    
    const [confirmFinishVisible, setConfirmFinishVisible] = useState(false)
    const handleFinishTask = () => {
        setConfirmFinishVisible(true)
        handleSetForm('finish')
    }

    /*const [confirmModifyDefinitionVisible, setConfirmModifyDefinitionVisible] = useState(false)
    const handleModifyDefinitionTask = () => {
        setConfirmModifyDefinitionVisible(true)
        handleSetForm('definition')
    }

    const [confirmModifyStatusOrObservationsVisible, setConfirmModifyStatusOrObservationsVisible] = useState(false)
    const handleModifyStatusOrObservationsTask = () => {
        setConfirmModifyStatusOrObservationsVisible(true)
        handleSetForm('status')
    }*/

    const [confirmReleaseVisible, setConfirmReleaseVisible] = useState(false)
    const handleReleaseTask = () => {
        setConfirmReleaseVisible(true)
        handleSetForm('release')
    }

    const [confirmDeleteVisible, setConfirmDeleteVisible] = useState(false)
    const handleDeleteTask = () => setConfirmDeleteVisible(true)

    const handleDeleteTaskAccepted = () => {
        try {
            logic.deleteTask(task.id)
                .then(() => onTaskRefreshed())
                .catch(error => {
                    console.error(error)

                    alert(error.message)
                })
        } catch (error) {
            console.error(error)

            alert(error.message)
        }
    }

    const [confirmSelectVisible, setConfirmSelectVisible] = useState(false)
    const handleSelectTask = () => setConfirmSelectVisible(true)

    const handleSelectTaskAccepted = () => {
        try {
            logic.selectTask(task.id)
                .then(() => {
                    onTaskRefreshed()
                    setConfirmSelectVisible(false)
                })
                .catch(error => {
                    console.error(error)

                    alert(error.message)
                })
        } catch (error) {
            console.error(error)

            alert(error.message)
        }
    }

    const handleFinishProcess = () => {
        handleSetForm('')
        setConfirmFinishVisible(false)
    }

    /*const handleFinishModifyDefinitionProcess = () => {
        handleSetForm('')
        setConfirmModifyDefinitionVisible(false)
    }

    const handleFinishModifyStatusOrObservationsProcess = () => {
        handleSetForm('')
        setConfirmModifyStatusOrObservationsVisible(false)
    }*/

    const handleFinishReleaseProcess = () => {
        handleSetForm('')
        setConfirmReleaseVisible(false)
    }

    const handleDeleteTaskCancelled = () => setConfirmDeleteVisible(false)
    
    const handleSelectTaskCancelled = () => setConfirmSelectVisible(false)

    return <div>
        <div className='flex items-center justify-between py-2 px-2'>
            <Text>{task.name}</Text>
            <div className='flex gap-2'>
                {!viewTask && <Button className='border-none px-2' onClick={handleViewTaskClick}>{<FaEye />}</Button>}
                {viewTask && <Button className='border-none px-2' onClick={handleProcessFinishClick}>{<FaEyeSlash />}</Button>}


                {/*task.owner === null && <Button className="border-indigo-300" onClick={handleSelectTask}>Assign</Button>}
                {task.owner === logic.getUserId() && task.status != 'finished' && task.visible != false && <Button className="border-indigo-300" onClick={handleReleaseTask}>Release</Button>}
{task.owner === logic.getUserId() && task.status != 'finished' && <Button className="border-indigo-300" onClick={handleFinishTask}>Finish</Button>*/}
                
                {(task.owner === logic.getUserId() || task.creator === logic.getUserId()) && task.status != 'finished' && <Button className='border-0 px-2' onClick={()=> handleModifyTaskClick()}>{<MdOutlineEdit />}</Button>}
                {task.creator === logic.getUserId() && <Button className='border-none px-2' onClick={handleDeleteTask}>{<RiDeleteBin5Line/>}</Button>}

                {((task.owner === null) || (task.owner === logic.getUserId() && task.status != 'finished') || (task.owner === logic.getUserId() && task.status != 'finished')) && <Button className='border-none px-2' onClick={handleViewTaskClick}>{<SlOptions />}</Button>}
            </div>
        </div>

        {viewTask && <TaskView task={task} onProcessFinished={handleProcessFinishClick} />}
        {confirmSelectVisible && <Confirm message='Select task?' onAccept={handleSelectTaskAccepted} onCancel={handleSelectTaskCancelled} />}
        {confirmReleaseVisible && <ReleaseTaskForm task={task} onProcessFinished={handleFinishReleaseProcess} />}
        {confirmFinishVisible && <FinishTaskForm task={task} onProcessFinished={handleFinishProcess} />}
        {confirmDeleteVisible && <Confirm message='Delete task?' onAccept={handleDeleteTaskAccepted} onCancel={handleDeleteTaskCancelled} />}

        {modifyTaskForm && <ModifyTaskForm  task={task} onProcessFinished={handleProcessFinishTaskClick} />}
    </div>
}

export default Task