

export const Time = (date) => {
    const time = new Date(date)
    const year = time.getFullYear().toString().slice(-2)
    const month = time.getMonth() + 1
    const day = time.getDate()
    const hours = time.getHours()
    const minutes = time.getMinutes()
    return `${day}/${month}/${year} - ${hours}h:${minutes}m`
}