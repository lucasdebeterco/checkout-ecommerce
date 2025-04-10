import { ITransaction } from '@/types/transaction.ts'

export function getTransactionsFromStorage() {
    const data = localStorage.getItem('transactions')
    return data ? JSON.parse(data) : []
}

export function saveTransactionToStorage(transaction: ITransaction) {
    const current = getTransactionsFromStorage()
    current.push(transaction)
    localStorage.setItem('transactions', JSON.stringify(current))
}

export function getTransactionByIdFromStorage(id: string) {
    const transactions = getTransactionsFromStorage()
    return transactions.find((t: ITransaction) => t.id === id)
}