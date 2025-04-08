export function validateCardNumber(cardNumber: string): boolean {
    const digits = cardNumber.replace(/\D/g, '')
    if (digits.length !== 16) return false

    let sum = 0
    let isEven = false

    for (let i = digits.length - 1; i >= 0; i--) {
        let digit = parseInt(digits[i])

        if (isEven) {
            digit *= 2
            if (digit > 9) {
                digit -= 9
            }
        }

        sum += digit
        isEven = !isEven
    }

    return sum % 10 === 0
}