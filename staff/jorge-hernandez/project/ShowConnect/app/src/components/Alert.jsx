import Button from './core/Button'

function Alert({ message, onAccept }) {
  return (
    <div className='fixed inset-0 flex items-center justify-center bg-blue-200 bg-opacity-50 z-50'>
      <div className='bg-blue-300 p-8 rounded-lg shadow-2xl border border-black'>
        <p className='mb-6 text-center text-red-600 text-lg font-semibold'>
          {message}
        </p>
        <div className='flex justify-center'>
          <Button onClick={onAccept}>Ok</Button>
        </div>
      </div>
    </div>
  )
}

export default Alert
