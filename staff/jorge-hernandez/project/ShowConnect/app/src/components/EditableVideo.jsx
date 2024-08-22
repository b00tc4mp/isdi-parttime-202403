import React, { useState } from 'react'
import logic from '../logic'
import validate from 'com/validate'

function EditableVideo({ artistId, label, onVideoUpdate }) {
  const [isEditing, setIsEditing] = useState(false)
  const [newVideo, setNewVideo] = useState(label)

  const handleVideoClick = () => setIsEditing(true)

  const handleVideoChange = (e) => setNewVideo(e.target.value)

  const handleVideoSave = () => {
    const updatedData = { video: newVideo }

    logic
      .updateArtistData(artistId, updatedData)
      .then(() => {
        onVideoUpdate(newVideo)
        setIsEditing(false)
      })
      .catch((error) => {
        console.error(error.message)
      })
  }

  const handleVideoCancel = () => {
    setNewVideo(label)
    setIsEditing(false)
  }

  return isEditing ? (
    <div>
      <input
        type='text'
        value={newVideo}
        onChange={handleVideoChange}
        className='text-black p-2 rounded'
      />
      <i
        onClick={handleVideoSave}
        className='fa-solid fa-check m-3 text-green-500 text-2xl'
      ></i>
      <i
        onClick={handleVideoCancel}
        className='fa-solid fa-xmark m-3 text-red-500 text-2xl'
      ></i>
    </div>
  ) : (
    <div
      onClick={handleVideoClick}
      className='flex justify-center my-1 relative w-full pb-[56.25%]'
    >
      <iframe
        className='absolute inset-0 w-full h-full'
        src={label}
        frameBorder='0'
        allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture'
        allowFullScreen
        title='YouTube video'
      ></iframe>
      <div className='absolute inset-0 w-full h-full' style={{ zIndex: 1 }} />
    </div>
  )
}

export default EditableVideo
