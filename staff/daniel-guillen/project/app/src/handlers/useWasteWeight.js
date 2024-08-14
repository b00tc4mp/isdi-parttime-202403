import { useState } from 'react'

const useWasteWeight = () => {
  const [weight, setWeight] = useState("")

  const handleWeightChange = (event) => {
    const { value } = event.target
    setWeight(value)
    console.log("Input weight:", value)
  }

  return { weight, handleWeightChange }
}
export default useWasteWeight