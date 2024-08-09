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
      <i
        onClick={onSave}
        className='fa-solid fa-check m-3 text-green-500 text-2xl'
      ></i>

      <i
        onClick={onCancel}
        class='fa-solid fa-xmark m-3 text-red-500 text-2xl'
      ></i>
    </div>
  ) : (
    <h1 className={`text-white text-3xl m-6 cursor-pointer`} onClick={onClick}>
      {label}
    </h1>
  )
}

export default EditableArtisticName
