const viewLogic = {}

viewLogic.getFullDateString = () => {
    const fullDate = new Date()
    const day = fullDate.getDate().toString().padStart(2, '0');
    const month = (fullDate.getMonth() + 1).toString().padStart(2, '0');
    const year = fullDate.getFullYear().toString();
    const hour = fullDate.getHours().toString().padStart(2, '0');
    const minute = fullDate.getMinutes().toString().padStart(2, '0');

    const date = `${day}/${month}/${year} ${hour}:${minute}`;

    return date
}