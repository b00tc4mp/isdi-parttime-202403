export const sortInspections = (inspections) => {
  return inspections.sort((a, b) => new Date(b.worker.date) - new Date(a.worker.date))
}

export const getMonthName = (monthNumber) => {
  const months = [
    "Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", 
    "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"
  ];
  
  const monthIndex = parseInt(monthNumber, 10) - 1
  return months[monthIndex] || "Mes inválido"
}