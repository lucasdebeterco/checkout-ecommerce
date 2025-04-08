import { zodResolver } from '@hookform/resolvers/zod'
import { CreditCard, ShoppingCart, User } from 'lucide-react'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import { z } from 'zod'

import { formatCardNumber } from '../utils/format-card-number'
import { formatCurrency } from '../utils/format-currency'
// import { validateCardNumber } from '../utils/validate-card-number'
// import { validateExpiryDate } from '../utils/validate-expiry-date'

const checkoutSchema = z.object({
    customer: z.object({
        name: z.string().min(1, 'Name is required'),
        // email: z.string().email('Invalid email'),
        // phone: z.string().min(1, 'Phone is required'),
        // address: z.object({
        //     street: z.string().min(1, 'Street is required'),
        //     number: z.string().min(1, 'Number is required'),
        //     complement: z.string().optional(),
        //     neighborhood: z.string().min(1, 'Neighborhood is required'),
        //     city: z.string().min(1, 'City is required'),
        //     state: z.string().min(2, 'State is required'),
        //     zipCode: z.string().min(8, 'ZIP code is required')
        // })
    }),
    payment: z.object({
        cardNumber: z.string().min(16, 'Invalid card number'),
        // cardHolder: z.string().min(1, 'Cardholder name is required'),
        // expiryMonth: z.string().min(2, 'Invalid month'),
        // expiryYear: z.string().min(2, 'Invalid year'),
        // cvv: z.string().min(3, 'Invalid CVV'),
        // installments: z.number().min(1).max(12)
    })
})

const mockCart = [
    {
        id: '1',
        name: 'Wireless Headphones',
        price: 299.99,
        quantity: 1,
        image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e'
    }
]

export function Checkout() {
    const navigate = useNavigate()
    const [isSubmitting, setIsSubmitting] = useState(false)

    const { register, handleSubmit, setValue, formState: { errors } } = useForm({
        resolver: zodResolver(checkoutSchema)
    })

    const onSubmit = async (data: any) => {
        setIsSubmitting(true)
        try {
            const response = await fetch('/api/checkout', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data)
            })

            const result = await response.json()
            if (response.ok) {
                navigate(`/transactions/${result.transaction.id}`)
            }
        } catch (error) {
            console.error('Checkout failed:', error)
        } finally {
            setIsSubmitting(false)
        }
    }

    const total = mockCart.reduce((sum, item) => sum + item.price * item.quantity, 0)

    return (
        <div className="min-h-screen bg-gray-50">
            <div className="mx-auto max-w-7xl px-4 py-8">
                <h1 className="mb-8 text-3xl font-bold">Checkout</h1>

                <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
                    <div className="lg:col-span-2">
                        <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
                            {/* Customer Information */}
                            <div className="rounded-lg bg-white p-6 shadow">
                                <div className="mb-4 flex items-center gap-2">
                                    <User className="size-5" />
                                    <h2 className="text-xl font-semibold">Customer Information</h2>
                                </div>

                                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700">Name</label>
                                        <input
                                            type="text"
                                            {...register('customer.name')}
                                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                                        />
                                        {errors.customer?.name && (
                                            <p className="mt-1 text-sm text-red-600">{errors.customer.name.message}</p>
                                        )}
                                    </div>

                                    {/* Add more customer fields */}
                                </div>
                            </div>

                            {/* Payment Information */}
                            <div className="rounded-lg bg-white p-6 shadow">
                                <div className="mb-4 flex items-center gap-2">
                                    <CreditCard className="size-5" />
                                    <h2 className="text-xl font-semibold">Payment Information</h2>
                                </div>

                                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700">Card Number</label>
                                        <input
                                            type="text"
                                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                                            maxLength={19}
                                            {...register('payment.cardNumber', {
                                                onChange: (e) => {setValue('payment.cardNumber', formatCardNumber(e.target.value))}
                                            })}
                                        />
                                        {errors.payment?.cardNumber && (
                                            <p className="mt-1 text-sm text-red-600">{errors.payment.cardNumber.message}</p>
                                        )}
                                    </div>

                                    {/* Add more payment fields */}
                                </div>
                            </div>

                            <button
                                type="submit"
                                disabled={isSubmitting}
                                className="w-full rounded-md bg-indigo-600 px-4 py-3 text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 disabled:opacity-50"
                            >
                                {isSubmitting ? 'Processing...' : 'Complete Purchase'}
                            </button>
                        </form>
                    </div>

                    {/* Order Summary */}
                    <div className="lg:col-span-1">
                        <div className="sticky top-4 rounded-lg bg-white p-6 shadow">
                            <div className="mb-4 flex items-center gap-2">
                                <ShoppingCart className="size-5" />
                                <h2 className="text-xl font-semibold">Order Summary</h2>
                            </div>

                            <div className="space-y-4">
                                {mockCart.map((item) => (
                                    <div key={item.id} className="flex gap-4">
                                        <img
                                            src={item.image}
                                            alt={item.name}
                                            className="size-20 rounded object-cover"
                                        />
                                        <div>
                                            <h3 className="font-medium">{item.name}</h3>
                                            <p className="text-gray-500">Quantity: {item.quantity}</p>
                                            <p className="font-medium">{formatCurrency(item.price)}</p>
                                        </div>
                                    </div>
                                ))}

                                <div className="border-t pt-4">
                                    <div className="flex justify-between font-medium">
                                        <span>Total</span>
                                        <span>{formatCurrency(total)}</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}