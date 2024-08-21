import Button from '../../components/core/Button'
import Text from '../../components/core/Text'

import View from '../../components/library/View'
import Confirm from './Confirm'
import FinishTaskForm from './FinishTaskForm'
import ModifyDefinitionTaskForm from './ModifyDefinitionTaskForm'
import ModifyStatusOrObervationTaskForm from './ModifyStatusOrObservationTaskForm'
import ReleaseTaskForm from './ReleaseTaskForm'

import logic from '../../logic'
import { useState } from 'react'

import useContext from '../../useContext'

function Task({ task, onTaskDeleted }) {
    const { alert } = useContext()

    const [form, setForm] = useState('')
    const handleSetForm = (url) => setForm(form)
    
    const [confirmFinishVisible, setConfirmFinishVisible] = useState(false)
    const handleFinishTask = () => {
        setConfirmFinishVisible(true)
        handleSetForm('finish')
    }

    const [confirmModifyDefinitionVisible, setConfirmModifyDefinitionVisible] = useState(false)
    const handleModifyDefinitionTask = () => {
        setConfirmModifyDefinitionVisible(true)
        handleSetForm('definition')
    }

    const [confirmModifyStatusOrObservationsVisible, setConfirmModifyStatusOrObservationsVisible] = useState(false)
    const handleModifyStatusOrObservationsTask = () => {
        setConfirmModifyStatusOrObservationsVisible(true)
        handleSetForm('status')
    }

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

    const handleFinishProcess = () => {
        handleSetForm('')
        setConfirmFinishVisible(false)
    }

    const handleFinishModifyDefinitionProcess = () => {
        handleSetForm('')
        setConfirmModifyDefinitionVisible(false)
    }

    const handleFinishModifyStatusOrObservationsProcess = () => {
        handleSetForm('')
        setConfirmModifyStatusOrObservationsVisible(false)
    }

    const handleFinishReleaseProcess = () => {
        handleSetForm('')
        setConfirmReleaseVisible(false)
    }

    const handleDeleteTaskCancelled = () => setConfirmDeleteVisible(false)

    return <div>
        <div className="flex items-center justify-between py-2">
            <Text>{task.name}</Text>
            <div className="flex gap-2">
                {task.creator === logic.getUserId() && <Button className="border-none" onClick={handleDeleteTask}>Delete</Button>}
                {task.creator === logic.getUserId()&& task.status != 'finished' && <Button className="border-none" onClick={handleModifyDefinitionTask}>Modify definition of task</Button>}
                {task.owner === logic.getUserId() && task.status != 'finished' && <Button className="border-none" onClick={handleModifyStatusOrObservationsTask}>Modify status/observations of task</Button>}
                {task.owner === logic.getUserId() && task.status != 'finished' && task.visible != false && <Button className="border-none" onClick={handleReleaseTask}>Release task</Button>}
                {task.owner === logic.getUserId() && task.status != 'finished' && <Button className="border-none" onClick={handleFinishTask}>Finish task</Button>}
            </div>
        </div>
        
        {confirmDeleteVisible && <Confirm message="Delete task?" onAccept={handleDeleteTaskAccepted} onCancel={handleDeleteTaskCancelled} />}
        {confirmModifyDefinitionVisible && <ModifyDefinitionTaskForm task={task}  onProcessFinished={handleFinishModifyDefinitionProcess}/>}
        {confirmModifyStatusOrObservationsVisible && <ModifyStatusOrObervationTaskForm task={task}  onProcessFinished={handleFinishModifyStatusOrObservationsProcess}/>}
        {confirmReleaseVisible && <ReleaseTaskForm task={task} onProcessFinished={handleFinishReleaseProcess} />}
        {confirmFinishVisible && <FinishTaskForm task={task} onProcessFinished={handleFinishProcess} />}
    </div>
}

export default Task