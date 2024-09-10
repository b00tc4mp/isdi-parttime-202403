function TaskView({ task }) {
    return <div className='bg-white w-full text-center'>
        <div className='flex  justify-center'><p className='pr-2 font-extrabold'>Name:</p> <p className='italic'>{task.name}</p></div>
        <div className='flex  justify-center'><p className='pr-2 font-extrabold'>Description:</p> <p className='italic'>{task.description}</p></div>
        <div className='flex  justify-center'><p className='pr-2 font-extrabold'>Status:</p> <p className='italic'>{task.status === 'toDo' && 'to do'}{task.status === 'inProgress' && 'in progress'}{task.status === 'finished' && task.status}{task.status === 'canceled' && task.status}</p></div>
        <div className='flex  justify-center'><p className='pr-2 font-extrabold'>Priority:</p> <p className='italic'>{task.priority}</p></div>
        
        <div className='flex  justify-center'>{task.observations !== '' && <><p className='pr-2 font-extrabold'>Observations:</p><p className='italic'>{task.observations}</p></>}</div>
        <div className='flex  justify-center'>{task.completionTime !== 0 && <><p className='pr-2 font-extrabold'>Completion time:</p><p className='italic'>{task.completionTime} hours</p></>}</div>
    </div>
}

export default TaskView