import { useState } from 'react'

import logic from '../logic'

function EditableDescription({ artistId, label, onDescriptionUpdate }) {
  const [isEditing, setIsEditing] = useState(false)
  const [newDescription, setNewDescription] = useState(label)

  const handleDescriptionClick = () => setIsEditing(true)

  const handleDescriptionChange = (event) =>
    setNewDescription(event.target.value)

  const handleDescriptionSave = () => {
    const updatedData = { description: newDescription }
    logic
      .updateArtistData(artistId, updatedData)
      .then(() => {
        onDescriptionUpdate(newDescription)
        setIsEditing(false)
      })
      .catch((error) => {
        console.error('Error updating artist data:', error)
      })
  }

  const handleDescriptionCancel = () => {
    setIsEditing(false)
    setNewDescription(label)
  }

  return isEditing ? (
    <div>
      <input
        type='text'
        value={newDescription}
        onChange={handleDescriptionChange}
        className='text-black p-2 rounded'
      />
      <div className='flex justify-center'>
        <i
          onClick={handleDescriptionSave}
          className='fa-solid fa-check m-3 text-green-500 text-2xl'
        ></i>

        <i
          onClick={handleDescriptionCancel}
          className='fa-solid fa-xmark m-3 text-red-500 text-2xl'
        ></i>
      </div>
    </div>
  ) : (
    <p
      onClick={handleDescriptionClick}
      className='text-white text-sm m-3 cursor-pointer'
    >
      {label}
    </p>
  )
}

export default EditableDescription
