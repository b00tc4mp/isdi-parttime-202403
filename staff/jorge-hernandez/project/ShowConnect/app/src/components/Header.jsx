import { useState, useEffect } from 'react'
import logic from '../logic/index'

function Header({
  onRegisterClick,
  onClick,
  children,
  loginButtonChildren,
  isArtistHomeVisible,
  onLogoClick,
}) {
  const [name, setName] = useState('')

  useEffect(() => {
    if (logic.isUserLoggedIn()) {
      try {
        logic
          .getArtistData()
          .then((artistData) => {
            setName(artistData.name)
          })
          .catch((error) => {
            console.error(error)
            alert(error.message)
          })
      } catch (error) {
        console.error(error)
        alert(error.message)
      }
    }
  }, [])

  return (
    <div className='Header'>
      <header>
        {!isArtistHomeVisible && (
          <button
            onClick={onRegisterClick}
            className='w-full h-20 text-white bg-blue-700 hover:bg-blue-800 focus:outline-none focus:ring-0 font-medium border-none text-lg px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700'
          >
            {children}
          </button>
        )}
        <div className='flex justify-between m-2 items-center'>
          <h1
            onClick={onLogoClick}
            className='text-white text-[40px] mx-1 text-transparent bg-gradient-to-r from-white to-yellow-50 bg-clip-text cursor-pointer'
          >
            ShowConnect
          </h1>
          <h2>{name}</h2>
          <button
            onClick={onClick}
            className='h-10 mt-4 text-white bg-blue-700 hover:bg-blue-800 focus:outline-none focus:ring-0 font-medium border-none text-sm px-5 py-2.5 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 rounded-md shadow-md'
          >
            {loginButtonChildren}
          </button>
        </div>
      </header>
    </div>
  )
}

export default Header
