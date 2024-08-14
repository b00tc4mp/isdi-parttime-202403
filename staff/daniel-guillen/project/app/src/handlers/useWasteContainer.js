import { useState } from 'react'

const useWasteContainer = () => {
  const [optionsContainer, setOptionsContainer] = useState("")

  const handleOptionsContainer = (event) => {
    const { value } = event.target
    setOptionsContainer(value)
    console.log("Selected option:", value)
  }

  return { optionsContainer, handleOptionsContainer }
}

export default useWasteContainer