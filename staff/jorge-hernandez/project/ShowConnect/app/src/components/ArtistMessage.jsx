function ArtistMessage({ onClose }) {
  return (
    <div className='fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-60'>
      <div className='bg-gray-800 text-white rounded-lg p-6 w-full max-w-4xl relative'>
        <button className='absolute top-4 right-4 text-2xl' onClick={onClose}>
          &times;
        </button>
      </div>
    </div>
  )
}

export default ArtistMessage
