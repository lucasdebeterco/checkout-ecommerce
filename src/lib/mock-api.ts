import { createServer, Model, Response } from 'miragejs'

export function makeServer() {
    return createServer({
        models: {
            transaction: Model,
        },

        routes() {
            this.namespace = 'api'

            this.post('/checkout', (schema, request) => {
                const attrs = JSON.parse(request.requestBody)

                if (!attrs?.paymentMethod?.card.number) {
                    return new Response(400, {}, { error: 'Invalid card number' })
                }

                const transactionData = {
                    id: 'tr_' + Math.random().toString(36).substr(2, 9),
                    status: 'authorized',
                    ...attrs,
                }

                console.log('transaction data: ', transactionData)

                const created = schema.create('transaction', transactionData)

                return {
                    transaction: created.attrs,
                }
            })

            this.get('/transactions', (schema) => {
                return schema.all('transaction')
            })

            // this.get('/transactions/:id', (schema, request) => {
            //     const id = request.params.id
            //     const transaction = schema.find('transaction', id)
            //
            //     if (!transaction) {
            //         return new Response(404, {}, { error: 'Transaction not found' })
            //     }
            //
            //     return transaction.attrs
            // })
        },
    })
}
