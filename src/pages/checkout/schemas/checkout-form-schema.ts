import { z } from 'zod'

export const checkoutFormSchema = z.object({
    amount: z.number().min(0.01, 'Invalid Amount'),
    customer: z.object({
        firstName: z.string().min(1, 'Name is required'),
        lastName: z.string().min(1, 'Last name is required'),
        document: z.object({
            type: z.enum(['cpf', 'cnpj']),
            number: z.string().min(1, 'Document number is required'),
        }),
        address: z.object({
            city: z.string().min(1, 'City is required'),
            street: z.string().min(1, 'Street is required'),
            number: z.string().min(1, 'Number is required'),
            country: z.string().min(1, 'country is required'),
            state: z.string().min(2, 'State is required'),
            neighborhood: z.string().min(1, 'Neighborhood is required'),
        })
    }),
    // items: z.array(z.object({
    //     name: z.string().min(1, 'Item name is required'),
    //     quantity: z.string().min(1, 'Item quantity is required'),
    //     amount: z.string().min(1, 'Item amount is required'),
    // })),
    paymentMethod: z.object({
        type: z.string().default('card'),
        card: z.object({
            number: z.string().min(16, 'Invalid card number'),
            //holderName: z.string().min(1, 'Cardholder name is required'),
            // cvv: z.string().min(3, 'Invalid CVV'),
            // expirationDate: z.string().min(5, 'Invalid date'),
            // installments: z.number().min(1).max(12)
        })
    })
})