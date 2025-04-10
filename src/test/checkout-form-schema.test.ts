import { describe, expect, it } from 'vitest'
import { z } from 'zod'

import { checkoutFormSchema } from '@/pages/checkout/schemas/checkout-form-schema.ts'

describe('checkoutFormSchema', () => {
    describe('Card Number Validation', () => {
        it('should invalidate a card number failing the Luhn check', () => {
            const invalidData = {
                amount: 100,
                customer: {
                    firstName: 'Lucas',
                    lastName: 'Debeterco',
                    document: { type: 'cpf', number: '091.011.649-02' },
                    address: {
                        city: 'Rio do Sul',
                        street: 'João Cavilha',
                        number: '123',
                        country: 'Brazil',
                        state: 'SC',
                        neighborhood: 'Taboão',
                    },
                },
                items: [{ name: 'Product 1', quantity: 1, amount: 100 }],
                paymentMethod: {
                    type: 'card',
                    card: {
                        number: '4111 1111 1111 1112',
                        holderName: 'Lucas Debeterco',
                        cvv: '123',
                        expirationDate: '12/2025',
                        installments: 1,
                    },
                },
            }

            expect(() => checkoutFormSchema.parse(invalidData)).toThrowError(z.ZodError)
        })

        it('should invalidate a card number with incorrect length', () => {
            const invalidData = {
                amount: 100,
                customer: {
                    firstName: 'Lucas',
                    lastName: 'Debeterco',
                    document: { type: 'cpf', number: '091.011.649-02' },
                    address: {
                        city: 'Rio do Sul',
                        street: 'João Cavilha',
                        number: '123',
                        country: 'Brazil',
                        state: 'SC',
                        neighborhood: 'Taboão',
                    },
                },
                items: [{ name: 'Product 1', quantity: 1, amount: 100 }],
                paymentMethod: {
                    type: 'card',
                    card: {
                        number: '4111 1111 1111 111',
                        holderName: 'Lucas Debeterco',
                        cvv: '123',
                        expirationDate: '12/2025',
                        installments: 1,
                    },
                },
            }

            expect(() => checkoutFormSchema.parse(invalidData)).toThrowError(z.ZodError)
        })
    })

    describe('Expiration Date Validation', () => {
        it('should invalidate an expiration date with incorrect format', () => {
            const invalidData = {
                amount: 100,
                customer: {
                    firstName: 'Lucas',
                    lastName: 'Debeterco',
                    document: { type: 'cpf', number: '091.011.649-02' },
                    address: {
                        city: 'Rio do Sul',
                        street: 'João Cavilha',
                        number: '123',
                        country: 'Brazil',
                        state: 'SC',
                        neighborhood: 'Taboão',
                    },
                },
                items: [{ name: 'Product 1', quantity: 1, amount: 100 }],
                paymentMethod: {
                    type: 'card',
                    card: {
                        number: '4111 1111 1111 1111',
                        holderName: 'Lucas Debeterco',
                        cvv: '123',
                        expirationDate: '122025',
                        installments: 1,
                    },
                },
            }

            expect(() => checkoutFormSchema.parse(invalidData)).toThrowError(z.ZodError)
        })
    })

    describe('CVV Validation', () => {
        it('should invalidate a CVV with incorrect length', () => {
            const invalidData = {
                amount: 100,
                customer: {
                    firstName: 'Lucas',
                    lastName: 'Debeterco',
                    document: { type: 'cpf', number: '091.011.649-02' },
                    address: {
                        city: 'Rio do Sul',
                        street: 'João Cavilha',
                        number: '123',
                        country: 'Brazil',
                        state: 'SC',
                        neighborhood: 'Taboão',
                    },
                },
                items: [{ name: 'Product 1', quantity: 1, amount: 100 }],
                paymentMethod: {
                    type: 'card',
                    card: {
                        number: '4111 1111 1111 1111',
                        holderName: 'Lucas Debeterco',
                        cvv: '12',
                        expirationDate: '12/2025',
                        installments: 1,
                    },
                },
            }

            expect(() => checkoutFormSchema.parse(invalidData)).toThrowError(z.ZodError)
        })
    })

    describe('Other Fields Validation', () => {
        it('should invalidate if customer first name is missing', () => {
            const invalidData = {
                amount: 100,
                customer: {
                    lastName: 'Debeterco',
                    document: { type: 'cpf', number: '091.011.649-02' },
                    address: {
                        city: 'Rio do Sul',
                        street: 'João Cavilha',
                        number: '123',
                        country: 'Brazil',
                        state: 'SC',
                        neighborhood: 'Taboão',
                    },
                },
                items: [{ name: 'Product 1', quantity: 1, amount: 100 }],
                paymentMethod: {
                    type: 'card',
                    card: {
                        number: '4111111111111111',
                        holderName: 'Lucas Debeterco',
                        cvv: '123',
                        expirationDate: '12/2025',
                        installments: 1,
                    },
                },
            }

            expect(() => checkoutFormSchema.parse(invalidData)).toThrowError(z.ZodError)
        })

        it('should invalidate if amount is less than 0.01', () => {
            const invalidData = {
                amount: 0,
                customer: {
                    firstName: 'Lucas',
                    lastName: 'Debeterco',
                    document: { type: 'cpf', number: '091.011.649-02' },
                    address: {
                        city: 'Rio do Sul',
                        street: 'João Cavilha',
                        number: '123',
                        country: 'Brazil',
                        state: 'SC',
                        neighborhood: 'Taboão',
                    },
                },
                items: [{ name: 'Product 1', quantity: 1, amount: 0 }],
                paymentMethod: {
                    type: 'card',
                    card: {
                        number: '4111111111111111',
                        holderName: 'Lucas Debeterco',
                        cvv: '123',
                        expirationDate: '12/2025',
                        installments: 1,
                    },
                },
            }

            expect(() => checkoutFormSchema.parse(invalidData)).toThrowError(z.ZodError)
        })
    })
})