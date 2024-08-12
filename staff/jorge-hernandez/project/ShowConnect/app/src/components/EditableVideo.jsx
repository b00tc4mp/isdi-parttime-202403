import React from 'react'

function EditableVideo({
  isEditing,
  value,
  onChange,
  onSave,
  onCancel,
  onClick,
  label,
}) {
  return isEditing ? (
    <div>
      <input
        type='text'
        value={value}
        onChange={onChange}
        className='text-black p-2 rounded'
      />
      <button
        className='ml-2 text-white bg-blue-700 hover:bg-blue-800 focus:outline-none focus:ring-0 font-medium border-none text-sm px-5 py-2.5 mb-2 rounded-md shadow-md'
        onClick={onSave}
      >
        Save
      </button>
      <button
        className='ml-2 text-white bg-blue-700 hover:bg-blue-800 focus:outline-none focus:ring-0 font-medium border-none text-sm px-5 py-2.5 mb-2 rounded-md shadow-md'
        onClick={onCancel}
      >
        Cancel
      </button>
    </div>
  ) : (
    <div
      onClick={onClick}
      className='flex justify-center my-1 relative w-full pb-[56.25%]'
    >
      <iframe
        className='absolute inset-0 w-full h-full'
        src={label}
        frameBorder='0'
        allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture'
        allowFullScreen
        title='YouTube video'
      ></iframe>
    </div>
  )
}

export default EditableVideo
