function Header({
  onRegisterClick,
  onClick,
  children,
  loginButtonChildren,
  isArtistHomeVisible,
  onLogoClick,
}) {
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
{
  /* <h1 className='text-3xl font-bold text-transparent bg-gradient-to-r from-white to-blue-500 bg-clip-text mx-4 my-2 text-center'>
  ShowConnect
</h1> */
}
