import { useState, useEffect } from 'react'
import getWeekNumber from './getWeekNumber'

const groupedItemsWeek = (list) => {

  const [week, setWeek] = useState("")
  const [year, setYear] = useState("")

  useEffect(() => {
    const today = new Date()
    setWeek(getWeekNumber(today))
    setYear(today.getFullYear().toString())
  }, [])

  if (!list) {
    return []
  }
  
  // Filtramos los residuos por semana y año actual
  const filteredList = list.filter(item => item.week === week && item.year === year)

  //Agrupamos item por codigo y sumamos todos los pesos mismo codigo
  const groupedItemCode = filteredList.reduce((acc, item) => {
    const existingItemCode = acc.find(i => i.code === item.code)
    if (existingItemCode) {
      existingItemCode.totalWeight += parseFloat(item.weight)
    } else {
      acc.push({ ...item, totalWeight: parseFloat(item.weight) })
    }
    return acc
  }, [])

  // ordenamos por codigo y devolvemos resultado
  return groupedItemCode.sort((a, b) => a.code.localeCompare(b.code))
}

export default groupedItemsWeek