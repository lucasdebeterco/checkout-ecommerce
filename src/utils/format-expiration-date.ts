export function formatExpirationDate(value: string) {
    const numbersOnly = value.replace(/\D/g, '')

    let formatted = ''
    const day = numbersOnly.slice(0, 2)
    const year = numbersOnly.slice(2, 6)

    if (day.length > 0) {
        formatted += day
    }
    if (year.length > 0) {
        formatted += `/${year}`
    }

    return formatted
}