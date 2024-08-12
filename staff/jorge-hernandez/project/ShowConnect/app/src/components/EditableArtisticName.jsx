import logic from '../logic'
import { useState } from 'react'

function EditableArtisticName({ onArtisticNameUpdate, artistId, label }) {
  const [newArtisticName, setNewArtisticName] = useState('')
  const [isEditing, setIsEditing] = useState(false)

  const handleNameClick = () => setIsEditing(true)
  const handleNameChange = (e) => setNewArtisticName(e.target.value)
  const handleNameSave = () => {
    const updatedData = { artisticName: newArtisticName }
    logic
      .updateArtistData(artistId, updatedData)
      .then(() => {
        onArtisticNameUpdate(newArtisticName)
        setIsEditing(false)
      })
      .catch((error) => {
        console.error('Error updating artist data:', error)
      })
  }
  const handleNameCancel = () => {
    setIsEditing(false)
    setNewArtisticName(label)
  }

  return isEditing ? (
    <div>
      <input
        type='text'
        value={newArtisticName}
        onChange={handleNameChange}
        className={`text-black p-2 rounded`}
      />
      <i
        onClick={handleNameSave}
        className='fa-solid fa-check m-3 text-green-500 text-2xl'
      ></i>

      <i
        onClick={handleNameCancel}
        className='fa-solid fa-xmark m-3 text-red-500 text-2xl'
      ></i>
    </div>
  ) : (
    <h1
      className={`text-white text-3xl m-6 cursor-pointer`}
      onClick={handleNameClick}
    >
      {label}
    </h1>
  )
}

export default EditableArtisticName
