export async function getTransactions() {
    const response = await fetch('/api/transactions')
    return response.json()
}