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
  const [isAddingDate, setIsAddingDate] = useState(false)
  const [newArtisticName, setNewArtisticName] = useState('')
  const [newDate, setNewDate] = useState('')

  useEffect(() => {
    logic
      .getArtistData()
      .then((artistData) => {
        setArtist(artistData)
      })
      .catch((error) => {
        console.error(error)
      })
  }, [])

  const handleClickMessages = () => onShowMessage()

  const handleClickAddDate = () => setIsAddingDate(true)
  const handleDateChange = (e) => setNewDate(e.target.value)
  const handleDateSave = () => {
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
              artistId={artist.id}
              label={artist.artisticName}
              onArtisticNameUpdate={(newArtisticName) => {
                setArtist({ ...artist, artisticName: newArtisticName })
              }}
            />
            <div className='flex items-center mb-3'>
              <EditableImage
                artistId={artist.id}
                label={artist.images}
                onImageUpdate={(newImage) => {
                  setArtist({ ...artist, images: newImage })
                }}
              />
              <EditableDescription
                artistId={artist.id}
                label={artist.description}
                onDescriptionUpdate={(newDescription) =>
                  setArtist({ ...artist, description: newDescription })
                }
              />
            </div>
            <EditableVideo
              artistId={artist.id}
              label={artist.video}
              onVideoUpdate={(newVideo) =>
                setArtist({ ...artist, video: newVideo })
              }
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
