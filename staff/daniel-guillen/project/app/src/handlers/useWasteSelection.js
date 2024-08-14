import { useState } from 'react'

const useWasteSelection = () => {
  const [selectedWaste, setSelectedWaste] = useState("")

  const handleWasteChange = (selectedOption) => {
    setSelectedWaste(selectedOption)
    console.log("Selected waste:", selectedOption)
  }

  return { selectedWaste, handleWasteChange }
}

export default useWasteSelection