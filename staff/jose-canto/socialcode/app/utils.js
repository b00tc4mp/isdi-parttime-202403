const utils = {}

utils.getDateStringDayMonthYearFormat = () => {

  const newDate = new Date();
  const year = newDate.getFullYear();
  const month = newDate.getMonth() + 1; // Agregamos 1 porque los meses van de 0 a 11
  const day = newDate.getDate();
  const hours = newDate.getHours();
  const minutes = newDate.getMinutes();

  let date = `${day.toString().padStart(2, '0')}/${month.toString().padStart(2, '0')}/${year.toString()} ${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`

  return date
}

module.exports = utils