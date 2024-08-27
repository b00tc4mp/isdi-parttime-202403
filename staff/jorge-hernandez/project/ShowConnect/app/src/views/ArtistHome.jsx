import { useEffect, useState } from 'react'
import logic from '../logic'
import Header from '../components/Header'
import EditableArtisticName from '../components/EditableArtisticName'
import EditableImage from '../components/EditableImage'
import EditableDescription from '../components/EditableDescription'
import EditableVideo from '../components/EditableVideo'
import AddDate from '../components/AddDate'
import ArtistMessages from './ArtistMessages'
//TODO EDIT BUTTON
function ArtistHome({ onUserLoggedOut }) {
  const [artist, setArtist] = useState(null)
  const [isMessages, setIsMessages] = useState(false)

  useEffect(() => {
    try {
      logic
        .getArtistData()
        .then((artistData) => {
          setArtist(artistData)
        })
        .catch((error) => {
          console.error(error)
        })
    } catch (error) {
      console.error(error)
    }
  }, [])

  const handleClickMessages = () => setIsMessages(true)

  const handleClickBack = () => setIsMessages(false)

  const handleLogout = () => {
    logic.logoutUser()
    onUserLoggedOut()
  }

  const handleDateUpdate = (newDate) => {
    const updatedDates = [...artist.dates, newDate]
    setArtist({ ...artist, dates: updatedDates })
  }

  const handleDateDelete = (date) => {
    const updatedDates = artist.dates.filter((d) => d !== date)
    setArtist({ ...artist, dates: updatedDates })
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

      {isMessages ? (
        <ArtistMessages onClickBack={handleClickBack} />
      ) : (
        <div className='flex items-center justify-center bg-black bg-opacity-60 m-2 mt-10 border rounded-md shadow-md'>
          <div className='bg-gray-700 text-white rounded-lg p-2 w-full max-w-4xl relative'>
            <i
              onClick={handleClickMessages}
              className=' cursor-pointer fa-regular fa-message text-xl ml-2 mt-2'
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
                  label={artist.image}
                  onImageUpdate={(newImage) => {
                    setArtist({ ...artist, image: newImage })
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
                dates={artist.dates}
                artistId={artist.id}
                onDateUpdate={handleDateUpdate}
                onDateDelete={handleDateDelete}
              />
            </div>
          </div>
        </div>
      )}
    </>
  )
}

export default ArtistHome
