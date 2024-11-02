const getTodayMonthYear = () => {
  const today = new Date() 
  const date = today.toISOString()
  const month = String(today.getMonth() + 1).padStart(2, '0')
  const year = String(today.getFullYear())
  
  return { today, date, month, year }
}

export default getTodayMonthYear