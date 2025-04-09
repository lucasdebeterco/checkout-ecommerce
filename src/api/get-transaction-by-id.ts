export async function getTransactionById(id: string) {
    const response = await fetch(`/api/transactions/${id}`)
    return response.json()
}
