import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation } from '@tanstack/react-query'
import { CreditCard, User } from 'lucide-react'
import { ReactElement } from 'react'
import { Controller,useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'

import { postTransaction } from '@/api/post-transaction.ts'
import { Input } from '@/components/ui/input.tsx'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select.tsx'
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
        defaultValues: {
            customer: { document: {type: 'cpf'} },
            paymentMethod: { card: { installments: 1 } }
        }
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
                                    <h2 className="font-semibold text-gray-800">Customer Information</h2>
                                </div>

                                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                                    <Input
                                        label="Name"
                                        error={errors.customer?.firstName}
                                        {...register('customer.firstName')}
                                        name="customer.firstName"
                                    />
                                    <Input
                                        label="Last Name"
                                        error={errors.customer?.lastName}
                                        {...register('customer.lastName')}
                                        name="customer.lastName"
                                    />
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
                                    <Input
                                        label="Document number"
                                        error={errors.customer?.document?.number}
                                        {...register('customer.document.number')}
                                        name="customer.document.number"
                                    />
                                </div>
                            </div>


                            <div className="rounded-lg bg-white p-6 shadow">
                                <div className="mb-6 flex items-center gap-2">
                                    <User className="size-5 text-base-green" />
                                    <h2 className="text-md font-semibold text-gray-800">Address Information</h2>
                                </div>

                                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                                    <Input
                                        label="City"
                                        error={errors.customer?.address?.city}
                                        {...register('customer.address.city')}
                                        name="customer.address.city"
                                    />
                                    <Input
                                        label="Street"
                                        error={errors.customer?.address?.street}
                                        {...register('customer.address.street')}
                                        name="customer.address.street"
                                    />
                                    <Input
                                        label="Number"
                                        error={errors.customer?.address?.number}
                                        {...register('customer.address.number')}
                                        name="customer.address.number"
                                    />
                                    <Input
                                        label="Country"
                                        error={errors.customer?.address?.country}
                                        {...register('customer.address.country')}
                                        name="customer.address.country"
                                    />
                                    <Input
                                        label="State"
                                        error={errors.customer?.address?.state}
                                        {...register('customer.address.state')}
                                        name="customer.address.state"
                                    />
                                    <Input
                                        label="Neighborhood"
                                        error={errors.customer?.address?.neighborhood}
                                        {...register('customer.address.neighborhood')}
                                        name="customer.address.neighborhood"
                                    />
                                </div>
                            </div>

                            <div className="rounded-lg bg-white p-6 shadow">
                                <div className="mb-6 flex items-center gap-2">
                                    <CreditCard className="size-5 text-base-green" />
                                    <h2 className="text-md font-semibold text-gray-800">Payment Information</h2>
                                </div>

                                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                                    <Input
                                        label="Card Number"
                                        error={errors.paymentMethod?.card?.number}
                                        {...register('paymentMethod.card.number', {
                                            onChange: (e) => {
                                                setValue('paymentMethod.card.number', formatCardNumber(e.target.value))
                                            }
                                        })}
                                        maxLength={19}
                                        name="paymentMethod.card.number"
                                    />
                                    <Input
                                        label="Card Holder"
                                        error={errors.paymentMethod?.card?.holderName}
                                        {...register('paymentMethod.card.holderName')}
                                        name="paymentMethod.card.holderName"
                                    />
                                    <Input
                                        label="CVV"
                                        error={errors.paymentMethod?.card?.cvv}
                                        {...register('paymentMethod.card.cvv', {
                                            onChange: (e) => {
                                                setValue('paymentMethod.card.cvv', e.target.value.slice(0, 3))
                                            }
                                        })}
                                        name="paymentMethod.card.cvv"
                                    />

                                    <Input
                                        label="Expiration Date"
                                        error={errors.paymentMethod?.card?.expirationDate}
                                        {...register('paymentMethod.card.expirationDate', {
                                            onChange: (e) => {
                                                setValue('paymentMethod.card.expirationDate', formatExpirationDate(e.target.value))
                                            }
                                        })}
                                        name="paymentMethod.card.expirationDate"
                                    />

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700">Installments</label>

                                        <Controller
                                            name="paymentMethod.card.installments"
                                            control={control}
                                            render={({ field: { name, onChange, value } }) => (
                                                <Select name={name} value={String(value)} onValueChange={(value) => onChange(Number(value))}>
                                                    <SelectTrigger>
                                                        <SelectValue />
                                                    </SelectTrigger>
                                                    <SelectContent>
                                                        <SelectItem value="1">1x</SelectItem>
                                                        <SelectItem value="2">2x</SelectItem>
                                                        <SelectItem value="3">3x</SelectItem>
                                                        <SelectItem value="4">4x</SelectItem>
                                                        <SelectItem value="5">5x</SelectItem>
                                                        <SelectItem value="6">6x</SelectItem>
                                                    </SelectContent>
                                                </Select>
                                            )}
                                        />
                                        {errors.paymentMethod?.card?.installments && (
                                            <p className="mt-1 text-sm text-red-600">{errors.paymentMethod.card.installments.message}</p>
                                        )}
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