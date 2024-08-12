function AddDate({
  isEditing,
  value,
  onChange,
  onSave,
  onCancel,
  onClick,
  dates,
  label,
  handleDeleteDate,
}) {
  return isEditing ? (
    <div className='flex flex-col text-black items-center m-10'>
      <input
        className={`text-black p-2 rounded`}
        type='date'
        value={value}
        onChange={onChange}
      />
      <div className='flex'>
        <i
          onClick={onSave}
          className='fa-solid fa-check m-3 text-green-500 text-2xl'
        ></i>
        <i
          onClick={onCancel}
          className='fa-solid fa-xmark m-3 text-red-500 text-2xl'
        ></i>
      </div>
    </div>
  ) : (
    <div className='flex flex-col items-center border rounded-md m-4 p-4 w-full'>
      <div className='flex items-start w-full justify-between text-2xl'>
        <h2>Fechas ocupadas</h2>
        <i onClick={onClick} className='fa-solid fa-plus'></i>
      </div>
      <ul className='m-3 flex flex-col gap-2'>
        {dates.sort().map((date, index) => (
          <li key={index} className='flex items-center'>
            <span className='flex-1'>{label || date}</span>
            <i
              onClick={() => handleDeleteDate(date)}
              className='fa-solid fa-xmark text-red-500 text-2xl ml-6'
            ></i>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default AddDate
