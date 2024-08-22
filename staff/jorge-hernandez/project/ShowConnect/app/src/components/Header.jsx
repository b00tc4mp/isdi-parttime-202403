import { useState, useEffect } from 'react'
import logic from '../logic/index'
import Button from './core/Button'

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
          <Button
            onClick={onRegisterClick}
            className='w-full h-20 text-white bg-blue-700 hover:bg-blue-800 focus:outline-none focus:ring-0 font-medium border-none text-lg px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700'
          >
            {children}
          </Button>
        )}
        <div className='flex m-2 items-center gap-4 justify-between '>
          <h1
            onClick={onLogoClick}
            className=' text-white text-[40px] text-transparent bg-gradient-to-r from-white to-yellow-50 bg-clip-text cursor-pointer'
          >
            ShowConnect
          </h1>
          <Button onClick={onClick}>{loginButtonChildren}</Button>
        </div>
        <h2 className=' mr-3 text-end text-white text-xl'>{name}</h2>
      </header>
    </div>
  )
}

export default Header
