import { useState, useEffect } from 'react'
import logic from '../logic/index.js'
import Header from '../components/Header.jsx'

function ArtistHome({ onUserLoggedOut }) {
  const [name, setName] = useState('')

  useEffect(() => {
    try {
      logic
        .getUserName()
        .then((name) => {
          setName(name)
        })
        .catch((error) => {
          console.error(error)

          alert(error.message)
        })
    } catch (error) {
      console.error(error)

      alert(error.message)
    }
  }, [])

  const handleLogout = () => {
    logic.logoutUser()

    onUserLoggedOut()
  }

  return (
    <>
      <Header
        isArtistHomeVisible={true}
        loginButtonChildren={'Logout'}
        onClick={handleLogout}
      ></Header>
      <div className='flex flex-col justify-center'>
        <h1 className='text-white text-xl m-3'>{name}</h1>
        <p className='text-white text-sm m-3'>
          Lorem, ipsum dolor sit amet consectetur adipisicing elit. Est nam, aut
          quas esse deleniti autem nemo sunt temporibus non explicabo iure
          expedita sint repellendus voluptatibus unde. Quos quia earum soluta
          rerum, doloremque perferendis, quas blanditiis cum porro quam dolorem
          repellendus.
        </p>

        <div className='youtube-video flex justify-center my-6'>
          <iframe
            className='w-full max-w-xl h-72 md:h-96'
            width='560'
            height='315'
            src={`https://www.youtube.com/embed/v65ltE90C4w?si=Nt3HQ9gCs7FEw-RA`}
            frameBorder='0'
            allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture'
            allowFullScreen
            title='YouTube video'
          ></iframe>
        </div>

        <button className='h-10 mt-4 text-white bg-blue-700 hover:bg-blue-800 focus:outline-none focus:ring-0 font-medium border-none text-sm px-5 py-2.5 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 rounded-md shadow-md'>
          Contacta con {name}
        </button>
      </div>
    </>
  )
}
export default ArtistHome
