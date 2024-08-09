import React from 'react'

function EditableImage({
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

      <div className='flex justify-center'>
        <i
          onClick={onSave}
          className='fa-solid fa-check m-3 text-green-500 text-2xl'
        ></i>

        <i
          onClick={onCancel}
          class='fa-solid fa-xmark m-3 text-red-500 text-2xl'
        ></i>
      </div>
    </div>
  ) : (
    <img
      className='w-20 h-20 m-2 object-cover shadow-black shadow-md border border-spacing-2 border-white cursor-pointer'
      src={label}
      onClick={onClick}
      alt='imágen de perfil'
    />
  )
}

export default EditableImage
