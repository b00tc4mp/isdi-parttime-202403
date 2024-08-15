import Button from '../../components/core/Button'
import Text from '../../components/core/Text'

import View from '../../components/library/View'
import Confirm from './Confirm'

import logic from '../../logic'
import { useState } from 'react'

import useContext from '../../useContext'

function Task({ task, /*onTaskModified,*/ onTaskDeleted }) {
    const { alert } = useContext()

    /*const [confirmModifyVisible, setConfirmModifyVisible] = useState(false)

    const handleModifyTask = () => setConfirmModifyVisible(true)*/

    const [confirmDeleteVisible, setConfirmDeleteVisible] = useState(false)

    const handleDeleteTask = () => setConfirmDeleteVisible(true)

    /*const handleModifyTaskAccepted = () => {
        try {
            logic.ModifyTask(task.id)
                .then(() => onTaskModified())
                .catch(error => {
                    console.error(error)

                    alert(error.message)
                })
        } catch (error) {
            console.error(error)

            alert(error.message)
        }
    }*/

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

    //const handleModifyTaskCancelled = () => setConfirmModifyVisible(false)
    const handleDeleteTaskCancelled = () => setConfirmDeleteVisible(false)

    return <View tag="article" align="">
        <View direction='row'>
            <Text>{task.name}</Text>
            {task.creator === logic.getUserId() && <Button onClick={handleDeleteTask}>Delete</Button>}
            {/*task.creator === logic.getUserId() && <Button onClick={handleModifyTask}>Modify</Button>*/}
        </View>

        {/*confirmModifyVisible && <Confirm message="Modify task?" onAccept={handleModifyTaskAccepted} onCancel={handleModifyTaskAccepted} />*/}
        {confirmDeleteVisible && <Confirm message="Delete task?" onAccept={handleDeleteTaskAccepted} onCancel={handleDeleteTaskCancelled} />}
    </View>
}

export default Task