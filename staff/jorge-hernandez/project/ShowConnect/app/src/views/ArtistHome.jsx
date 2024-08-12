import { useEffect, useState } from 'react'
import logic from '../logic'
import Header from '../components/Header'
import EditableArtisticName from '../components/EditableArtisticName'
import EditableImage from '../components/EditableImage'
import EditableDescription from '../components/EditableDescription'
import EditableVideo from '../components/EditableVideo'
import AddDate from '../components/AddDate'

function ArtistHome({ onUserLoggedOut, onShowMessage }) {
  const [artist, setArtist] = useState(null)
  const [isEditingName, setIsEditingName] = useState(false)
  const [isEditingImage, setIsEditingImage] = useState(false)
  const [isEditingDescription, setIsEditingDescription] = useState(false)
  const [isEditingVideo, setIsEditingVideo] = useState(false)
  const [isAddingDate, setIsAddingDate] = useState(false)
  const [newArtisticName, setNewArtisticName] = useState('')
  const [newImage, setNewImage] = useState('')
  const [newDescription, setNewDescription] = useState('')
  const [newVideo, setNewVideo] = useState('')
  const [newDate, setNewDate] = useState('')

  useEffect(() => {
    logic
      .getArtistData()
      .then((artistData) => {
        setArtist(artistData)
      })
      .catch((error) => {
        console.error('Error fetching artist data:', error)
      })
  }, [])

  const handleImageClick = () => setIsEditingImage(true)
  const handleImageChange = (event) => setNewImage(event.target.value)
  const handleImageSave = () => {
    const updatedData = { images: newImage }
    logic
      .updateArtistData(artist.id, updatedData)
      .then(() => {
        setArtist({ ...artist, images: newImage })
        setIsEditingImage(false)
      })
      .catch((error) => {
        console.error('Error updating artist data:', error)
      })
  }
  const handleImageCancel = () => setIsEditingImage(false)

  const handleNameClick = () => setIsEditingName(true)
  const handleNameChange = (e) => setNewArtisticName(e.target.value)
  const handleNameSave = () => {
    const updatedData = { artisticName: newArtisticName }
    logic
      .updateArtistData(artist.id, updatedData)
      .then(() => {
        setArtist({ ...artist, artisticName: newArtisticName })
        setIsEditingName(false)
      })
      .catch((error) => {
        console.error('Error updating artist data:', error)
      })
  }
  const handleNameCancel = () => setIsEditingName(false)

  const handleDescriptionClick = () => setIsEditingDescription(true)
  const handleDescriptionChange = (event) =>
    setNewDescription(event.target.value)
  const handleDescriptionSave = () => {
    const updatedData = { description: newDescription }
    logic
      .updateArtistData(artist.id, updatedData)
      .then(() => {
        setArtist({ ...artist, description: newDescription })
        setIsEditingDescription(false)
      })
      .catch((error) => {
        console.error('Error updating artist data:', error)
      })
  }
  const handleDescriptionCancel = () => setIsEditingDescription(false)

  const handleVideoClick = () => setIsEditingVideo(true)
  const handleVideoChange = (event) => setNewVideo(event.target.value)
  const handleVideoSave = () => {
    const updatedData = { video: newVideo }
    logic
      .updateArtistData(artist.id, updatedData)
      .then(() => {
        setArtist({ ...artist, video: newVideo })
        setIsEditingVideo(false)
      })
      .catch((error) => {
        console.error('Error updating artist data:', error)
      })
  }
  const handleVideoCancel = () => setIsEditingVideo(false)

  const handleClickMessages = () => onShowMessage()

  const handleClickAddDate = () => setIsAddingDate(true)
  const handleDateChange = (e) => setNewDate(e.target.value)
  const handleDateSave = () => {
    const updatedDates = [...artist.dates, newDate]
    const updatedData = { dates: updatedDates }

    logic
      .updateArtistData(artist.id, updatedData)
      .then(() => {
        setArtist({ ...artist, dates: updatedDates })
        setNewDate('')
        setIsAddingDate(false)
      })
      .catch((error) => {
        console.error('Error updating artist data:', error)
      })
  }

  const handleDateCancel = () => {
    setNewDate('')
    setIsAddingDate(false)
  }

  const handleDeleteDate = (date) => {
    console.log(date)
  }

  const handleLogout = () => {
    logic.logoutUser()
    onUserLoggedOut()
  }

  if (!artist) {
    return <div>Loading...</div>
  }

  return (
    <>
      <Header
        isArtistHomeVisible={true}
        loginButtonChildren='logout'
        onClick={handleLogout}
      >
        ShowConnect
      </Header>

      <div className='flex items-center justify-center bg-black bg-opacity-60 m-2 mt-10 border rounded-md shadow-md'>
        <div className='bg-gray-700 text-white rounded-lg p-2 w-full max-w-4xl relative'>
          <i
            onClick={handleClickMessages}
            className='cursor-pointer fa-regular fa-message text-2xl ml-2 mt-2'
          ></i>

          <div className='flex flex-col items-center'>
            <EditableArtisticName
              isEditing={isEditingName}
              value={newArtisticName}
              onChange={handleNameChange}
              onSave={handleNameSave}
              onCancel={handleNameCancel}
              onClick={handleNameClick}
              label={artist.artisticName}
            />
            <div className='flex items-center mb-3'>
              <EditableImage
                isEditing={isEditingImage}
                value={newImage}
                onChange={handleImageChange}
                onSave={handleImageSave}
                onCancel={handleImageCancel}
                onClick={handleImageClick}
                label={artist.images}
              />
              <EditableDescription
                isEditing={isEditingDescription}
                value={newDescription}
                onChange={handleDescriptionChange}
                onSave={handleDescriptionSave}
                onCancel={handleDescriptionCancel}
                onClick={handleDescriptionClick}
                label={artist.description}
              />
            </div>
            <EditableVideo
              isEditing={isEditingVideo}
              value={newVideo}
              onChange={handleVideoChange}
              onSave={handleVideoSave}
              onCancel={handleVideoCancel}
              onClick={handleVideoClick}
              label={artist.video}
            />
            <AddDate
              isEditing={isAddingDate}
              value={newDate}
              onChange={handleDateChange}
              onSave={handleDateSave}
              onCancel={handleDateCancel}
              onClick={handleClickAddDate}
              dates={artist.dates}
              handleDeleteDate={handleDeleteDate}
            />
          </div>
        </div>
      </div>
    </>
  )
}

export default ArtistHome
