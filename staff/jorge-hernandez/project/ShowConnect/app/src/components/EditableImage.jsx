import logic from '../logic'
import { useState } from 'react'

function EditableImage({ artistId, label, onImageUpdate }) {
  const [isEditing, setIsEditing] = useState(false)
  const [newImage, setNewImage] = useState(label)

  const handleImageClick = () => setIsEditing(true)

  const handleImageChange = (e) => setNewImage(e.target.value)

  const handleImageSave = () => {
    const updatedData = { image: newImage }

    try {
      logic
        .updateArtistData(artistId, updatedData)
        .then(() => {
          onImageUpdate(newImage)
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
  const handleImageCancel = () => {
    setNewImage(label)
    setIsEditing(false)
  }

  return isEditing ? (
    <div>
      <input
        type='text'
        value={newImage}
        onChange={handleImageChange}
        className='text-black p-2 rounded'
      />

      <div className='flex justify-center'>
        <i
          onClick={handleImageSave}
          className='fa-solid fa-check m-3 text-green-500 text-2xl'
        ></i>

        <i
          onClick={handleImageCancel}
          class='fa-solid fa-xmark m-3 text-red-500 text-2xl'
        ></i>
      </div>
    </div>
  ) : (
    <img
      className='w-20 h-20 m-2 object-cover shadow-black shadow-md border border-spacing-2 border-white cursor-pointer'
      src={label}
      onClick={handleImageClick}
      alt='imágen de perfil'
    />
  )
}

export default EditableImage
