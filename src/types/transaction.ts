import { TransactionStatus } from '@/enums/transaction-status.ts'

export interface ITransaction {
    id: string
    amount: number
    status: TransactionStatus
    customer: ITransactionCustomer
    items: ITransactionItem[]
    paymentMethod: ITransactionPaymentMethod
}

export interface ITransactionItem {
    name: string
    quantity: number
    amount: number
}

interface ITransactionCustomer {
    firstName: string,
    lastName: string,
    document: {
        type: 'cpf' | 'cnpj'
        number: string
    }
    address: {
        city: string
        street: string
        number: string
        country: string
        state: string
        neighborhood: string
    }
}

interface ITransactionPaymentMethod {
    type: string
    card: {
        number: string
        holderName: string
        cvv: string
        expirationDate: string
        installments: number
    }
    processedByMalga: boolean
}