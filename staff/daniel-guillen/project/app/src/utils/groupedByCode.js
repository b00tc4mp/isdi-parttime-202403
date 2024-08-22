import useFetchItemsList from "../hooks/useFetchItemsList"

const groupedByCode = (collectionName) => {

  // Llama al hook con el nombre de la coleccion
  const { list } = useFetchItemsList(collectionName)

  // Agrupar, mostrar una sola iteracion y sumar el peso total por codigo
  const groupedItemCode = list.reduce((acc, item) => {
    const existingItemCode = acc.find(i => i.code === item.code)
    if (existingItemCode) {
      existingItemCode.totalWeight += parseFloat(item.weight)
    } else {
      acc.push({ ...item, totalWeight: parseFloat(item.weight) })
    }
    return acc
  }, [])

  // Ordenar por codigo y devolver el resultado
  return groupedItemCode.sort((a, b) => a.code.localeCompare(b.code))
}

export default groupedByCode