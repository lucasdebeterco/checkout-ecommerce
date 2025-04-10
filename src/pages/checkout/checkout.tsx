import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation } from '@tanstack/react-query'
import { CreditCard, User } from 'lucide-react'
import { ReactElement } from 'react'
import { Controller,useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'

import { postTransaction } from '@/api/post-transaction.ts'
import { queryClient } from '@/lib/query-client.ts'
import { OrderSummary } from '@/pages/checkout/order-summary.tsx'
import { CheckoutFormData, checkoutFormSchema } from '@/pages/checkout/schemas/checkout-form-schema.ts'
import { formatCardNumber } from '@/utils/format-card-number.ts'
import { formatExpirationDate } from '@/utils/format-expiration-date.ts'

export function Checkout() {
    const navigate = useNavigate()

    const { mutate, isPending } = useMutation({
        mutationFn: (data: CheckoutFormData) => postTransaction(data),
        onSuccess: (result) => {
            if (result.error) {
                toast.error(result.error)
            } else {
                queryClient.invalidateQueries({ queryKey: ['transactions'] })
                navigate(`/transactions/${result.transaction.id}`)
            }
        }
    })

    const { register, handleSubmit, setValue, control, formState: { errors } } = useForm({
        resolver: zodResolver(checkoutFormSchema),
        defaultValues: { customer: { document: {type: 'cpf'}} }
    })

    function onSubmitForm(data: CheckoutFormData) {
        mutate(data)
    }

    return (
        <div className="bg-gray-50">
            <div className="mx-auto max-w-7xl px-4 py-6">
                <h1 className="mb-8 text-xl font-semibold text-gray-800">Checkout</h1>

                <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
                    <div className="lg:col-span-2">
                        <form onSubmit={handleSubmit(onSubmitForm)} className="space-y-8">
                            <div className="rounded-lg bg-white p-6 shadow">
                                <div className="mb-6 flex items-center gap-2">
                                    <User className="size-5 text-base-green"/>
                                    <h2 className="text-md font-semibold text-gray-800">Customer Information</h2>
                                </div>

                                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700">Name</label>
                                        <input
                                            type="text"
                                            {...register('customer.firstName')}
                                            className="mt-1 block w-full rounded-md border border-gray-200 px-2 py-1 outline-0 focus:border-base-green"
                                        />
                                        {errors.customer?.firstName && (
                                            <p className="mt-1 text-sm text-red-600">{errors.customer.firstName.message}</p>
                                        )}
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700">Last Name</label>
                                        <input
                                            type="text"
                                            {...register('customer.lastName')}
                                            className="mt-1 block w-full rounded-md border border-gray-200 px-2 py-1 outline-0 focus:border-base-green"
                                        />
                                        {errors.customer?.lastName && (
                                            <p className="mt-1 text-sm text-red-600">{errors.customer.lastName.message}</p>
                                        )}
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700">Document</label>
                                        <Controller
                                            name="customer.document.type"
                                            control={control}
                                            render={({ field }) => (
                                                <div className="mt-2 flex gap-2 text-gray-800">
                                                    <div className="flex">
                                                        <input
                                                            type="radio"
                                                            id="document-cpf"
                                                            {...field}
                                                            value="cpf"
                                                            checked={field.value === 'cpf'}
                                                        />
                                                        <label htmlFor="document-cpf" className="pl-1">CPF</label>
                                                    </div>

                                                    <div className="flex">
                                                        <input
                                                            type="radio"
                                                            id="document-cnpj"
                                                            {...field}
                                                            value="cnpj"
                                                            checked={field.value === 'cnpj'}
                                                        />
                                                        <label htmlFor="document-cnpj" className="pl-1">CNPJ</label>
                                                    </div>
                                                </div> as ReactElement
                                            )}
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700">Document
                                            number</label>
                                        <input
                                            type="text"
                                            {...register('customer.document.number')}
                                            className="mt-1 block w-full rounded-md border border-gray-200 px-2 py-1 outline-0 focus:border-base-green"
                                        />
                                        {errors.customer?.document?.number && (
                                            <p className="mt-1 text-sm text-red-600">{errors.customer.document.number.message}</p>
                                        )}
                                    </div>
                                </div>
                            </div>


                            <div className="rounded-lg bg-white p-6 shadow">
                                <div className="mb-6 flex items-center gap-2">
                                    <User className="size-5 text-base-green" />
                                    <h2 className="text-md font-semibold text-gray-800">Address Information</h2>
                                </div>

                                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700">City</label>
                                        <input
                                            type="text"
                                            {...register('customer.address.city')}
                                            className="mt-1 block w-full rounded-md border border-gray-200 px-2 py-1 outline-0 focus:border-base-green"
                                        />
                                        {errors.customer?.address?.city && (
                                            <p className="mt-1 text-sm text-red-600">{errors.customer.address.city.message}</p>
                                        )}
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700">Street</label>
                                        <input
                                            type="text"
                                            {...register('customer.address.street')}
                                            className="mt-1 block w-full rounded-md border border-gray-200 px-2 py-1 outline-0 focus:border-base-green"
                                        />
                                        {errors.customer?.address?.street && (
                                            <p className="mt-1 text-sm text-red-600">{errors.customer.address.street.message}</p>
                                        )}
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700">Number</label>
                                        <input
                                            type="text"
                                            {...register('customer.address.number')}
                                            className="mt-1 block w-full rounded-md border border-gray-200 px-2 py-1 outline-0 focus:border-base-green"
                                        />
                                        {errors.customer?.address?.number && (
                                            <p className="mt-1 text-sm text-red-600">{errors.customer.address.number.message}</p>
                                        )}
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700">Country</label>
                                        <input
                                            type="text"
                                            {...register('customer.address.country')}
                                            className="mt-1 block w-full rounded-md border border-gray-200 px-2 py-1 outline-0 focus:border-base-green"
                                        />
                                        {errors.customer?.address?.country && (
                                            <p className="mt-1 text-sm text-red-600">{errors.customer.address.country.message}</p>
                                        )}
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700">State</label>
                                        <input
                                            type="text"
                                            {...register('customer.address.state')}
                                            className="mt-1 block w-full rounded-md border border-gray-200 px-2 py-1 outline-0 focus:border-base-green"
                                        />
                                        {errors.customer?.address?.state && (
                                            <p className="mt-1 text-sm text-red-600">{errors.customer.address.state.message}</p>
                                        )}
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700">Neighborhood</label>
                                        <input
                                            type="text"
                                            {...register('customer.address.neighborhood')}
                                            className="mt-1 block w-full rounded-md border border-gray-200 px-2 py-1 outline-0 focus:border-base-green"
                                        />
                                        {errors.customer?.address?.neighborhood && (
                                            <p className="mt-1 text-sm text-red-600">{errors.customer.address.neighborhood.message}</p>
                                        )}
                                    </div>
                                </div>
                            </div>

                            <div className="rounded-lg bg-white p-6 shadow">
                                <div className="mb-6 flex items-center gap-2">
                                    <CreditCard className="size-5 text-base-green" />
                                    <h2 className="text-md font-semibold text-gray-800">Payment Information</h2>
                                </div>

                                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700">Card Number</label>
                                        <input
                                            type="text"
                                            {...register('paymentMethod.card.number', {
                                                onChange: (e) => {
                                                    setValue('paymentMethod.card.number', formatCardNumber(e.target.value))
                                                }
                                            })}
                                            className="mt-1 block w-full rounded-md border border-gray-200 px-2 py-1 outline-0 focus:border-base-green"
                                            maxLength={19}
                                        />
                                        {errors.paymentMethod?.card?.number && (
                                            <p className="mt-1 text-sm text-red-600">{errors.paymentMethod.card.number.message}</p>)}
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700">Card Holder</label>
                                        <input
                                            type="text"
                                            {...register('paymentMethod.card.holderName')}
                                            className="mt-1 block w-full rounded-md border border-gray-200 px-2 py-1 outline-0 focus:border-base-green"
                                            maxLength={19}
                                        />
                                        {errors.paymentMethod?.card?.holderName && (
                                            <p className="mt-1 text-sm text-red-600">{errors.paymentMethod.card.holderName.message}</p>)}
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700">CVV</label>
                                        <input
                                            type="text"
                                            {...register('paymentMethod.card.cvv', {
                                                onChange: (e) => {
                                                    setValue('paymentMethod.card.cvv', e.target.value.slice(0, 3))
                                                }
                                            })}
                                            className="mt-1 block w-full rounded-md border border-gray-200 px-2 py-1 outline-0 focus:border-base-green"
                                            maxLength={19}
                                        />
                                        {errors.paymentMethod?.card?.cvv && (
                                            <p className="mt-1 text-sm text-red-600">{errors.paymentMethod.card.cvv.message}</p>)}
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700">Expiration
                                            Date</label>
                                        <input
                                            type="text"
                                            {...register('paymentMethod.card.expirationDate', {
                                                onChange: (e) => {
                                                    setValue('paymentMethod.card.expirationDate', formatExpirationDate(e.target.value))
                                                }
                                            })}
                                            className="mt-1 block w-full rounded-md border border-gray-200 px-2 py-1 outline-0 focus:border-base-green"
                                            maxLength={19}
                                        />
                                        {errors.paymentMethod?.card?.expirationDate && (
                                            <p className="mt-1 text-sm text-red-600">{errors.paymentMethod.card.expirationDate.message}</p>)}
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700">Installments</label>
                                        <input
                                            type="text"
                                            {...register('paymentMethod.card.installments', {valueAsNumber: true})}
                                            className="mt-1 block w-full rounded-md border border-gray-200 px-2 py-1 outline-0 focus:border-base-green"
                                            maxLength={19}
                                        />
                                        {errors.paymentMethod?.card?.installments && (
                                            <p className="mt-1 text-sm text-red-600">{errors.paymentMethod.card.installments.message}</p>)}
                                    </div>

                                    <div className="flex items-center">
                                        <Controller
                                            name="paymentMethod.processedByMalga"
                                            control={control}
                                            render={({ field: {name, onChange, value} }) => (
                                                <input
                                                    type="checkbox"
                                                    id="processedByMalga"
                                                    name={name}
                                                    onChange={onChange}
                                                    value={String(value)}
                                                />
                                            ) as ReactElement}
                                        />
                                        <label className="ml-2 block text-sm font-medium text-gray-700" htmlFor="processedByMalga">
                                            <span className="flex items-center gap-1">Processed by Malga <img src="/favicon.png" width={14} alt="Malga Logo"/></span>
                                        </label>
                                    </div>
                                </div>
                            </div>

                            <button
                                type="submit"
                                disabled={isPending}
                                className="w-full rounded-md bg-base-green px-4 py-3 text-white outline-0 hover:bg-base-green/90 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50"
                            >
                                {isPending ? 'Processing...' : 'Complete Purchase'}
                            </button>
                        </form>
                    </div>

                    <OrderSummary setValue={setValue}/>
                </div>
            </div>
        </div>
    )
}