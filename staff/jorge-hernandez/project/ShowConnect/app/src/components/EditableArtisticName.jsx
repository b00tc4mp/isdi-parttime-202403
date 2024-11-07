import React, { useState } from 'react'
import logic from '../logic'
import Context from '../Context'
import { useContext } from 'react'

function EditableArtisticName({ onArtisticNameUpdate, artistId, label }) {
  const [newArtisticName, setNewArtisticName] = useState(label)

  const [isEditing, setIsEditing] = useState(false)

  const { alert } = useContext(Context)

  const handleNameClick = () => setIsEditing(true)

  const handleNameChange = (e) => setNewArtisticName(e.target.value)

  const handleNameSave = () => {
    try {
      const updatedData = { artisticName: newArtisticName }

      logic
        .updateArtistData(artistId, updatedData)
        .then(() => {
          onArtisticNameUpdate(newArtisticName)
          setIsEditing(false)
        })
        .catch((error) => {
          console.error(error.message)
          alert(error.message)
        })
    } catch (error) {
      console.error(error.message)
      alert(error.message)
    }
  }

  const handleNameCancel = () => {
    setIsEditing(false)
    setNewArtisticName(label)
  }

  return (
    <div>
      {isEditing ? (
        <div>
          <input
            type='text'
            value={newArtisticName}
            onChange={handleNameChange}
            className='text-black p-2 rounded'
          />
          <i
            onClick={handleNameSave}
            className='fa-solid fa-check m-3 text-green-500 text-2xl cursor-pointer'
            title='Save'
          ></i>
          <i
            onClick={handleNameCancel}
            className='fa-solid fa-xmark m-3 text-red-500 text-2xl cursor-pointer'
            title='Cancel'
          ></i>
        </div>
      ) : (
        <h1
          className='text-white text-3xl m-6 cursor-pointer'
          onClick={handleNameClick}
        >
          {label}
        </h1>
      )}
    </div>
  )
}

export default EditableArtisticName
