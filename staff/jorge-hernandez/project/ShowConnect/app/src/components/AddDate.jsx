import React, { useState } from 'react'
import logic from '../logic'

function AddDate({ dates, label, artistId, onDateUpdate, onDateDelete }) {
  const [isAddingDate, setIsAddingDate] = useState(false)
  const [newDate, setNewDate] = useState(label || '')

  const handleClickAddDate = () => setIsAddingDate(true)

  const handleDateChange = (e) => setNewDate(e.target.value)

  const handleDateSave = () => {
    const dateObject = new Date(newDate)

    const formattedDate = dateObject.toISOString()

    const updatedDates = [...dates, formattedDate]

    const updatedData = { dates: updatedDates }

    logic
      .updateArtistData(artistId, updatedData)
      .then(() => {
        onDateUpdate(formattedDate)
        setIsAddingDate(false)
      })
      .catch((error) => {
        console.error(error.message)
        alert(error.message)
      })
  }

  const handleDateCancel = () => {
    setIsAddingDate(false)
  }

  const handleDeleteDate = (date) => {
    logic
      .deleteDate(artistId, date)
      .then(() => {
        onDateDelete(date)
      })
      .catch((error) => {
        console.error(error.message)
      })
  }

  const formatDate = (dateString) => {
    const date = new Date(dateString)
    const day = date.getDate().toString().padStart(2, '0')
    const month = (date.getMonth() + 1).toString().padStart(2, '0')
    const year = date.getFullYear()
    return `${day}-${month}-${year}`
  }

  return isAddingDate ? (
    <div className='flex flex-col text-black items-center m-10 border rounded-md'>
      <input
        className='text-black p-2 rounded'
        type='date'
        value={newDate}
        onChange={handleDateChange}
      />
      <div className='flex'>
        <i
          onClick={handleDateSave}
          className='fa-solid fa-check m-3 text-green-500 text-2xl'
        ></i>
        <i
          onClick={handleDateCancel}
          className='fa-solid fa-xmark m-3 text-red-500 text-2xl'
        ></i>
      </div>
    </div>
  ) : (
    <div className='flex flex-col items-center border rounded-md m-4 p-4 w-full'>
      <div className='flex items-start w-full justify-between text-2xl'>
        <h2>Fechas ocupadas</h2>
        <i onClick={handleClickAddDate} className='fa-solid fa-plus'></i>
      </div>
      <ul className='m-3 flex flex-col gap-2'>
        {dates.sort().map((date, index) => (
          <li key={index} className='flex items-center border rounded-md p-3'>
            <span className='flex-1'>{formatDate(date)}</span>{' '}
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
