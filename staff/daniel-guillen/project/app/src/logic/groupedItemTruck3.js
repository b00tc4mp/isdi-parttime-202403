import useFetchTruck3List from '../firebase/truck3/useFetchTruck3List'

const groupedItemTruck3 = () => {
  const { list } = useFetchTruck3List()

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

export default groupedItemTruck3