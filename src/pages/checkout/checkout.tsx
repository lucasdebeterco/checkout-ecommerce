import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation } from '@tanstack/react-query'
import { CreditCard, ShoppingCart, User } from 'lucide-react'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import { z } from 'zod'

import { postTransaction } from '@/api/post-transaction.ts'
import { queryClient } from '@/lib/query-client.ts'
import { cartMock } from '@/pages/checkout/mocks/cart-mock.ts'
import { checkoutFormSchema } from '@/pages/checkout/schemas/checkout-form-schema.ts'
import { formatCardNumber } from '@/utils/format-card-number.ts'
import { formatCurrency } from '@/utils/format-currency.ts'
// import { validateCardNumber } from '../utils/validate-card-number'
// import { validateExpiryDate } from '../utils/validate-expiry-date'




export function Checkout() {
    const navigate = useNavigate()

    const { mutate, isPending } = useMutation({
        mutationFn: postTransaction,
        onSuccess: (result) => {
            queryClient.invalidateQueries({ queryKey: ['transactions'] })
            navigate(`/transactions/${result.transaction.id}`)
        },
    })

    const { register, handleSubmit, setValue, formState: { errors } } = useForm({
        resolver: zodResolver(checkoutFormSchema)
    })

    const total = cartMock.reduce((sum, item) => sum + item.price * item.quantity, 0)
    setValue('amount', total)
    // TODO - Fazer setValue do array de itens

    return (
        <div className="bg-gray-50">
            <div className="mx-auto max-w-7xl px-4 py-8">
                <h1 className="mb-8 text-3xl font-bold">Checkout</h1>

                <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
                    <div className="lg:col-span-2">
                        <form onSubmit={handleSubmit(mutate)} className="space-y-8">

                            <div className="rounded-lg bg-white p-6 shadow">
                                <div className="mb-4 flex items-center gap-2">
                                    <User className="size-5"/>
                                    <h2 className="text-xl font-semibold">Customer Information</h2>
                                </div>

                                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700">Name</label>
                                        <input
                                            type="text"
                                            {...register('customer.firstName')}
                                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                                        />
                                        {errors.customer?.firstName && (
                                            <p className="mt-1 text-sm text-red-600">{errors.customer.firstName.message}</p>)}
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700">Last Name</label>
                                        <input
                                            type="text"
                                            {...register('customer.lastName')}
                                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                                        />
                                        {errors.customer?.lastName && (
                                            <p className="mt-1 text-sm text-red-600">{errors.customer.lastName.message}</p>)}
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700">Document</label>
                                        <input
                                            type="text"
                                            {...register('customer.document.type')}
                                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                                        />
                                        {errors.customer?.document.type && (
                                            <p className="mt-1 text-sm text-red-600">{errors.customer.document.type.message}</p>)}
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700">Document
                                            number</label>
                                        <input
                                            type="text"
                                            {...register('customer.document.number')}
                                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                                        />
                                        {errors.customer?.document.number && (
                                            <p className="mt-1 text-sm text-red-600">{errors.customer.document.number.message}</p>)}
                                    </div>
                                </div>
                            </div>


                            <div className="rounded-lg bg-white p-6 shadow">
                                <div className="mb-4 flex items-center gap-2">
                                    <User className="size-5" />
                                    <h2 className="text-xl font-semibold">Address Information</h2>
                                </div>

                                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700">City</label>
                                        <input
                                            type="text"
                                            {...register('customer.address.city')}
                                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                                        />
                                        {errors.customer?.address?.city && (
                                            <p className="mt-1 text-sm text-red-600">{errors.customer.address.city.message}</p>)}
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700">Street</label>
                                        <input
                                            type="text"
                                            {...register('customer.address.street')}
                                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                                        />
                                        {errors.customer?.address?.street && (
                                            <p className="mt-1 text-sm text-red-600">{errors.customer.address.street.message}</p>)}
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700">Number</label>
                                        <input
                                            type="text"
                                            {...register('customer.address.number')}
                                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                                        />
                                        {errors.customer?.address?.number && (
                                            <p className="mt-1 text-sm text-red-600">{errors.customer.address.number.message}</p>)}
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700">Country</label>
                                        <input
                                            type="text"
                                            {...register('customer.address.country')}
                                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                                        />
                                        {errors.customer?.address?.country && (
                                            <p className="mt-1 text-sm text-red-600">{errors.customer.address.country.message}</p>)}
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700">State</label>
                                        <input
                                            type="text"
                                            {...register('customer.address.state')}
                                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                                        />
                                        {errors.customer?.address?.state && (
                                            <p className="mt-1 text-sm text-red-600">{errors.customer.address.state.message}</p>)}
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700">Neighborhood</label>
                                        <input
                                            type="text"
                                            {...register('customer.address.neighborhood')}
                                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                                        />
                                        {errors.customer?.address?.neighborhood && (
                                            <p className="mt-1 text-sm text-red-600">{errors.customer.address.neighborhood.message}</p>)}
                                    </div>
                                </div>
                            </div>


                            {/* Payment Information */}
                            <div className="rounded-lg bg-white p-6 shadow">
                                <div className="mb-4 flex items-center gap-2">
                                    <CreditCard className="size-5"/>
                                    <h2 className="text-xl font-semibold">Payment Information</h2>
                                </div>

                                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700">Card Number</label>
                                        <input
                                            type="text"
                                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                                            maxLength={19}
                                            {...register('paymentMethod.card.number', {
                                                onChange: (e) => {
                                                    setValue('paymentMethod.card.number', formatCardNumber(e.target.value))
                                                }
                                            })}
                                        />
                                        {errors.paymentMethod?.card.number && (
                                            <p className="mt-1 text-sm text-red-600">{errors.paymentMethod.card.number.message}</p>)}
                                    </div>

                                </div>
                            </div>

                            <button
                                type="submit"
                                disabled={isPending}
                                className="w-full rounded-md bg-indigo-600 px-4 py-3 text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 disabled:opacity-50"
                            >
                                {isPending ? 'Processing...' : 'Complete Purchase'}
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
                                {cartMock.map((item) => (<div key={item.id} className="flex gap-4">
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
                                </div>))}

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
        </div>)
}