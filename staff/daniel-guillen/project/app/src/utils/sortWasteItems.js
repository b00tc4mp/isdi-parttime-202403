const sortWasteItems = (list) => {
  return list.sort((a, b) => {
    // Ordenamos list primero por code
    const codeComparison = a.code.localeCompare(b.code)
    if (codeComparison !== 0) return codeComparison
    // Después por acondicionamiento
    const containerComparison = b.container.localeCompare(a.container)
    if (containerComparison !== 0) return containerComparison
    // Y por último por peso
    return b.weight - a.weight
  })
}
export default sortWasteItems