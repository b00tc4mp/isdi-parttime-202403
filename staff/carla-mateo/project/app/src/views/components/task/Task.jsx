import { useEffect, useState } from 'react'

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
        <div className='flex flex-col items-center space-y-0' >
            <div className="flex gap-2">
                <Heading level="2">{task.title}</Heading>
                <Heading level="1">{task.assign.name}</Heading>
            </div>
            <Heading level="1">{task.description}</Heading>
            <Time>{task.date}</Time>
            <Button onClick={handleDeleteTask}>Delete</Button>
        </div>
    </View>
}
export default Task
