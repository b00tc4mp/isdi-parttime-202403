const sortUsers = (list) => {
  return list.sort((a, b) => {
    // Ordenamos primero por 'access'
    const accessComparison = a.access.localeCompare(b.access)
    if (accessComparison !== 0) return accessComparison
    // Después por 'username' en orden A-Z
    return a.username.localeCompare(b.username)
  })
}

export default sortUsers
