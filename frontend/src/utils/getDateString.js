export function getDateString(date) {
    if (typeof date === 'string')
        date = new Date(date)
    const day = date.getDate()
    const month = date.getMonth() + 1 > 10 ? date.getMonth() + 1 : `0${date.getMonth() + 1}`
    const year = date.getFullYear()
    return `${year}-${month}-${day}`
}
