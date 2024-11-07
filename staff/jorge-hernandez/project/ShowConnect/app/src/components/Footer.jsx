import Button from './core/Button'

function Footer({ onSearchclick, children }) {
  return (
    <Button
      className='w-full h-20 mt-9 text-white bg-blue-700 hover:bg-blue-800 focus:outline-none focus:ring-0 font-medium border-none text-lg px-5 pt-2.5 mb-0 dark:bg-blue-600 dark:hover:bg-blue-700'
      onClick={onSearchclick}
    >
      {children}
    </Button>
  )
}
export default Footer
