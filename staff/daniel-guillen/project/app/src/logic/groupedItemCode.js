import useFetchWasteList from '../firebase/stored/useFetchWasteList'

const useGroupedWasteList = () => {
  const { list } = useFetchWasteList()

  const today = new Date()
  const day = String(today.getDate()).padStart(2, '0')
  const month = String(today.getMonth() + 1).padStart(2, '0')
  const year = String(today.getFullYear())

  // Filtramos los residuos por mes y año actual
  const filteredList = list.filter(item => item.month === month && item.year === year)

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

export default useGroupedWasteList