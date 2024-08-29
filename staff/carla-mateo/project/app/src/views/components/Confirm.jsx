import React from 'react'
import Button from '../../components/core/Button'

const Confirm = ({ message, onConfirm, onCancel }) => (
    <div className='fixed top-0 left-0 w-full h-full flex justify-center items-center bg-gray-800 bg-opacity-75'>
        <div className='bg-green-100 border border-green-800 p-4 rounded shadow-lg'>
            <p className='text-gray-800 mb-4'>{message}</p>
            <div className='flex justify-between mr-2 ml-2 '>
                <Button onClick={onCancel}>
                    Cancel
                </Button>
                <Button onClick={onConfirm}>
                    Confirm
                </Button>
            </div>
        </div>
    </div>
)

export default Confirm