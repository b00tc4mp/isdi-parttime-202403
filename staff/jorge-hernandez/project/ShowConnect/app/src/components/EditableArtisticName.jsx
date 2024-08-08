import React from 'react'

function EditableArtisticName({
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
        className={`text-black p-2 rounded`}
      />
      <button
        className={`ml-2 text-white bg-blue-700 hover:bg-blue-800 focus:outline-none focus:ring-0 font-medium border-none text-sm px-5 py-2.5 mb-2 rounded-md shadow-md`}
        onClick={onSave}
      >
        Save
      </button>
      <button
        className={`ml-2 text-white bg-blue-700 hover:bg-blue-800 focus:outline-none focus:ring-0 font-medium border-none text-sm px-5 py-2.5 mb-2 rounded-md shadow-md`}
        onClick={onCancel}
      >
        Cancel
      </button>
    </div>
  ) : (
    <h1 className={`text-white text-3xl m-6 cursor-pointer`} onClick={onClick}>
      {label}
    </h1>
  )
}

export default EditableArtisticName
