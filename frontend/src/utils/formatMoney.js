const formatterDollar = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0
})
const formatterVN = new Intl.NumberFormat('vi', {
    style: 'currency',
    currency: 'VND',
    minimumFractionDigits: 0
})

export function formatMoney(amount, moneyType) {
    if (moneyType === 'dollar') return formatterDollar.format(amount)
    else return formatterVN.format(amount * 23000)
}
