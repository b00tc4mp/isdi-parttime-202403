const getWeekNumberYear = () => {
  const today = new Date()  
  const startOfYear = new Date(today.getFullYear(), 0, 1)
  const pastDaysOfYear = (today - startOfYear) / 86400000  
  const weekNumber = Math.ceil((pastDaysOfYear + startOfYear.getDay() + 1) / 7)

  const year = today.getFullYear()
  const formattedWeek = String(weekNumber).padStart(2, '0')
  const formattedYear = String(year)

  return { week: formattedWeek, year: formattedYear }
}

export default getWeekNumberYear