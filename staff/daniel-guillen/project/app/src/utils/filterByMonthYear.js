const filterByMonthYear = (items, month, year) => {
    return items.filter(item => item.month === month && item.year === year)
  }
  
  export default filterByMonthYear