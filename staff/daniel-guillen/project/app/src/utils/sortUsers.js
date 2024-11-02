const sortUsers = (list) => {
  return list.sort((a, b) => {
    const accessComparison = a.access.localeCompare(b.access)
    if (accessComparison !== 0) return accessComparison
    return a.username.localeCompare(b.username)
  })
}

export default sortUsers
