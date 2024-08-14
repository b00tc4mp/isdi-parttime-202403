import useFetchTruck2List from '../firebase/truck2/useFetchTruck2List'

const groupedItemTruck2 = () => {
  const { list } = useFetchTruck2List()

  const groupedItemCode = list.reduce((acc, item) => {
    const existingItemCode = acc.find(i => i.code === item.code)
    if (existingItemCode) {
      existingItemCode.totalWeight += parseFloat(item.weight)
    } else {
      acc.push({ ...item, totalWeight: parseFloat(item.weight) })
    }
    return acc
  }, [])

  return groupedItemCode.sort((a, b) => a.code.localeCompare(b.code))
}

export default groupedItemTruck2