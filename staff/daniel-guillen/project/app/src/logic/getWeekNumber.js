// funcion para traer semana
const getWeekNumber = (date) => {
    const startOfYear = new Date(date.getFullYear(), 0, 1)
    const pastDaysOfYear = (date - startOfYear) / 86400000
    return Math.ceil((pastDaysOfYear + startOfYear.getDay() + 1) / 7)
  }

  export default getWeekNumber