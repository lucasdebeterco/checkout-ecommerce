export function validateExpiryDate(month: string, year: string): boolean {
    const currentDate = new Date()
    const currentYear = currentDate.getFullYear()
    const currentMonth = currentDate.getMonth() + 1

    const expYear = parseInt(`20${year}`)
    const expMonth = parseInt(month)

    if (expYear < currentYear) return false
    if (expYear === currentYear && expMonth < currentMonth) return false

    return true
}