import { endOfMonth, isAfter,parse } from 'date-fns'
import { createServer, Model, Response } from 'miragejs'

import { TransactionStatus } from '@/enums/transaction-status.ts'
import {
    getTransactionByIdFromStorage,
    getTransactionsFromStorage,
    saveTransactionToStorage
} from '@/lib/local-storage.ts'

export function makeServer() {
    return createServer({
        models: {
            transaction: Model,
        },

        routes() {
            this.namespace = 'api'

            this.post('/checkout', (_, request) => {
                const attrs = JSON.parse(request.requestBody)
                const card = attrs?.paymentMethod?.card

                if (!card?.number || card?.number.length !== 19) {
                    return new Response(400, {}, { error: 'Invalid card number' })
                }

                if (card?.expirationDate) {
                    try {
                        const parsedDate = parse(card.expirationDate, 'MM/yyyy', new Date())
                        const lastDayOfMonth = endOfMonth(parsedDate)

                        if (!isAfter(lastDayOfMonth, new Date())) {
                            return new Response(400, {}, { error: 'Invalid expiration date' })
                        }
                    } catch (error) {
                        return new Response(400, {}, { error: 'Invalid expiration date format' })
                    }
                } else {
                    return new Response(400, {}, { error: 'Missing expiration date' })
                }

                const transactionData = {
                    id: 'tr_' + Math.random().toString(36).substr(2, 9),
                    status: attrs.paymentMethod.processedByMalga ? TransactionStatus.AUTHORIZED : TransactionStatus.REPROVED,
                    ...attrs,
                    paymentMethod: {
                        type: attrs.paymentMethod.type,
                        card: {
                            firstDigits: card.number.slice(0, 4),
                            lastDigits: card.number.slice(-4),
                            holderName: card.holderName,
                            expirationDate: card.expirationDate,
                            installments: card.installments
                        }
                    }
                }

                saveTransactionToStorage(transactionData)

                return {
                    transaction: transactionData,
                }
            })

            this.get('/transactions', () => {
                const transactions = getTransactionsFromStorage()
                return { transactions }
            })

            this.get('/transactions/:id', (_, request) => {
                const id = request.params.id
                const transaction = getTransactionByIdFromStorage(id)

                if (!transaction) {
                    return new Response(404, {}, { error: 'Transaction not found' })
                }

                return transaction
            })
        },
    })
}
