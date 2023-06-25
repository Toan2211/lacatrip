import moment from 'moment'

Date.prototype.addDays = function (days) {
    var date = new Date(this.valueOf())
    date.setDate(date.getDate() + days)
    return date
}

export function getDates(startDate, stopDate) {
    var dateArray = new Array()
    var currentDate = startDate
    while (currentDate <= stopDate) {
        dateArray.push(new Date(currentDate))
        currentDate = currentDate.addDays(1)
    }
    return dateArray
}

export function getLengthDay(startDate, endDate) {
    const start = moment(startDate, 'YYYY-MM-DD')
    const end = moment(endDate, 'YYYY-MM-DD')

    return end.diff(start, 'days')
}
