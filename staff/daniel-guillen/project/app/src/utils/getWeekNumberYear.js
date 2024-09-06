const getWeekNumberYear = () => {
  const today = new Date()  // Fecha actual
  const startOfYear = new Date(today.getFullYear(), 0, 1)
  const pastDaysOfYear = (today - startOfYear) / 86400000  // Milisegundos en un día
  const weekNumber = Math.ceil((pastDaysOfYear + startOfYear.getDay() + 1) / 7)

  const year = today.getFullYear()

  // Formatear semana con dos dígitos y convertir a string
  const formattedWeek = String(weekNumber).padStart(2, '0')
  const formattedYear = String(year)

  return { week: formattedWeek, year: formattedYear }
}

export default getWeekNumberYear