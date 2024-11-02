const sortReferences = (data) => {
    return data.sort((a, b) => {
      if (a.value.year !== b.value.year) {
        return b.value.year - a.value.year
      }
      if (a.value.week !== b.value.week) {
        return b.value.week - a.value.week
      }
      return a.value.reference.localeCompare(b.value.reference)
    })
  }
  
  export default sortReferences