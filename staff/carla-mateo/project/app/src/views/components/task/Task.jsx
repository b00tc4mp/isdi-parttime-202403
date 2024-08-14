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
                logic.deleteTask(task._id)
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

        <div>
            <Heading level="2">{task.title}</Heading>

            <text>{task.description}</text>

            <Heading level="1">{task.assign.name}</Heading>

            <Time>{task.date}</Time>

            <Button onClick={handleDeleteTask}>Delete</Button>

        </div>


    </View>
}
export default Task
