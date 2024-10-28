const sortWasteItems = (list) => {
  return list.sort((a, b) => {
    const codeComparison = a.code.localeCompare(b.code)
    if (codeComparison !== 0) return codeComparison
    const containerComparison = b.container.localeCompare(a.container)
    if (containerComparison !== 0) return containerComparison
    return b.weight - a.weight
  })
}
export default sortWasteItems