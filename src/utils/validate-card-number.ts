export function isValidCardNumber(cardNumber: string): boolean {
    const digits = cardNumber.replace(/\D/g, '').split('').reverse().map(Number)

    const checksum = digits.reduce((sum, digit, index) => {
        if (index % 2 === 1) {
            let doubled = digit * 2
            if (doubled > 9) doubled -= 9
            return sum + doubled
        }
        return sum + digit
    }, 0)

    return checksum % 10 === 0
}