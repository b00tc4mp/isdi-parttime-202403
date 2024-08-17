//funcion para traer numero de semana y año
const getWeekNumberYear = () => {
  const today = new Date()  // Fecha actual
  const startOfYear = new Date(today.getFullYear(), 0, 1)
  const pastDaysOfYear = (today - startOfYear) / 86400000  // Milisegundos en un día
  const weekNumber = Math.ceil((pastDaysOfYear + startOfYear.getDay() + 1) / 7)
  
  const year = today.getFullYear()

  return { week: weekNumber, year: year }
}

export default getWeekNumberYear