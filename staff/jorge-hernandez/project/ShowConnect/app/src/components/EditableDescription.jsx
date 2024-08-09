function EditableDescription({
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
    <p onClick={onClick} className='text-white text-sm m-3 cursor-pointer'>
      {label}
    </p>
  )
}

export default EditableDescription
