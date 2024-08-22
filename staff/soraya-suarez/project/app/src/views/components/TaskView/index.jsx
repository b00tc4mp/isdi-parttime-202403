import { AiOutlineClose } from "react-icons/ai"

import Text from '../../../components/core/Text'
import Button from "../../../components/core/Button"

function TaskView({ task, onProcessFinished }) {
    const handleExit = () => onProcessFinished()

    return <div className="bg-white w-full text-center">
        <Text>Name: {task.name}</Text>
        <Text>Description: {task.description}</Text>
        <Text>Status: {task.status}</Text>
        <Text>Priority: {task.priority}</Text>
        <Text>Observations: {task.observations}</Text>
        {task.completionTime !== 0 && <Text>Completion time: {task.completionTime} hours</Text>}
    </div>
}

export default TaskView