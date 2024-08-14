import useFetchActecoList from '../firebase/acteco/useFetchActecoList'

const groupedItemActeco = () => {
  const { list } = useFetchActecoList()

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

export default groupedItemActeco