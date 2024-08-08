import { useEffect, useState } from 'react'
import logic from '../logic'
import Header from '../components/Header'
import EditableArtisticName from '../components/EditableArtisticName'
import EditableImage from '../components/EditableImage'
import EditableDescription from '../components/EditableDescription'

function ArtistHome({ onUserLoggedOut }) {
  const [artist, setArtist] = useState(null)
  const [isEditingName, setIsEditingName] = useState(false)
  const [isEditingImage, setIsEditingImage] = useState(false)
  const [isEditingDescription, setIsEditingDescription] = useState(false)
  const [newArtisticName, setNewArtisticName] = useState('')
  const [newImage, setNewImage] = useState('')
  const [newDescription, setNewDescription] = useState('')

  useEffect(() => {
    logic
      .getArtistData()
      .then((artistData) => {
        setArtist(artistData)
        setNewArtisticName(artistData.artisticName)
      })
      .catch((error) => {
        console.error('Error fetching artist data:', error)
      })
  }, [])

  const handleImageClick = () => {
    setIsEditingImage(true)
  }

  const handleImageChange = (event) => {
    setNewImage(event.target.value)
  }

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

  const handleImageCancel = () => {
    setIsEditingImage(false)
  }

  const handleNameClick = () => {
    setIsEditingName(true)
  }

  const handleNameChange = (event) => {
    setNewArtisticName(event.target.value)
  }

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

  const handleDescriptionCancel = () => {
    setIsEditingDescription(false)
  }

  const handleDescriptionClick = () => {
    setIsEditingDescription(true)
  }

  const handleDescriptionChange = (event) => {
    setNewDescription(event.target.value)
  }

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

  const handleNameCancel = () => {
    setIsEditingName(false)
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

      <div className='flex items-center justify-center bg-black bg-opacity-60'>
        <div className='bg-gray-700 text-white rounded-lg p-6 w-full max-w-4xl relative'>
          <div className='flex flex-col justify-center items-center'>
            <EditableArtisticName
              isEditing={isEditingName}
              value={newArtisticName}
              onChange={handleNameChange}
              onSave={handleNameSave}
              onCancel={handleNameCancel}
              onClick={handleNameClick}
              label={artist.artisticName}
            />
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
            {/* <p className='text-white text-sm m-6 text-center'>
              {artist.description}
            </p> */}

            <div className='flex justify-center my-3'>
              <iframe
                // className='w-full max-w-xl h-72 md:h-96'
                width='560'
                height='315'
                src={artist.video}
                frameBorder='0'
                allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture'
                allowFullScreen
                title='YouTube video'
              ></iframe>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default ArtistHome
