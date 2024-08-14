import { useState } from 'react'

const useWasteStatus = () => {
  const [statusOptions, setStatusOptions] = useState("CORRECTO")

  const handleStatusOptions = (event) => {
    const { value } = event.target
    setStatusOptions(value)
    console.log("Estado del residuo:", value)
  }

  return { statusOptions, handleStatusOptions }
}

export default useWasteStatus