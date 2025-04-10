import { useQuery } from '@tanstack/react-query'
import { ClipboardList, CreditCard, MapPin, User } from 'lucide-react'
import { useParams } from 'react-router-dom'

import { getTransactionById } from '@/api/get-transaction-by-id.ts'
import { Loader } from '@/components/ui/loader.tsx'
import { TransactionStatus } from '@/enums/transaction-status.ts'
import { formatCurrency } from '@/utils/format-currency.ts'

export function TransactionDetails() {
    const { id } = useParams()

    const { data: transaction, isLoading } = useQuery({
        queryKey: [`transaction-${id}`],
        queryFn: () => getTransactionById(id ?? ''),
    })

    if (isLoading) return <Loader />

    return (
        <div className="mx-auto max-w-4xl">
            <div className="mb-8 flex items-center gap-2">
                <ClipboardList className="size-6 text-base-green" />
                <h1 className="text-lg font-semibold text-gray-800">Transaction Details</h1>
            </div>
            {!transaction.error ? (
                <div className="space-y-6">
                    <div className="rounded-lg bg-white p-6 shadow">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm text-gray-600">Transaction ID</p>
                                <p className="text-lg font-medium text-gray-900">{transaction.id}</p>
                            </div>
                            <div className="text-right">
                                <p className="text-sm text-gray-600">Amount</p>
                                <p className="text-lg font-medium text-gray-900">
                                    {formatCurrency(transaction.amount)}
                                </p>
                            </div>
                        </div>
                        <div className="mt-4">
                            <span className={`rounded-full px-3 py-1 text-sm font-semibold ${
                                transaction.status === TransactionStatus.AUTHORIZED
                                    ? 'bg-green-100 text-green-800'
                                    : 'bg-red-100 text-red-800'
                            }`}>
                                {transaction.status}
                            </span>
                        </div>
                    </div>

                    <div className="rounded-lg bg-white p-6 shadow">
                        <div className="mb-4 flex items-center gap-2">
                            <User className="size-5 text-base-green" />
                            <h2 className="font-semibold text-gray-800">Customer Information</h2>
                        </div>
                        <div className="grid gap-6 md:grid-cols-2">
                            <div>
                                <p className="text-sm text-gray-600">Name</p>
                                <p className="text-base font-medium text-gray-900">
                                    {transaction.customer.firstName} {transaction.customer.lastName}
                                </p>
                            </div>
                            <div>
                                <p className="text-sm text-gray-600">{transaction.customer.document.type.toUpperCase()}</p>
                                <p className="text-base font-medium text-gray-900">
                                    {transaction.customer.document.number}
                                </p>
                            </div>
                        </div>
                    </div>

                    <div className="rounded-lg bg-white p-6 shadow">
                        <div className="mb-4 flex items-center gap-2">
                            <MapPin className="size-5 text-base-green" />
                            <h2 className="font-semibold text-gray-800">Address</h2>
                        </div>
                        <div className="grid gap-6 md:grid-cols-2">
                            <div>
                                <p className="text-sm text-gray-600">Street</p>
                                <p className="text-base font-medium text-gray-900">
                                    {transaction.customer.address.street}, {transaction.customer.address.number}
                                </p>
                            </div>
                            <div>
                                <p className="text-sm text-gray-600">Neighborhood</p>
                                <p className="text-base font-medium text-gray-900">
                                    {transaction.customer.address.neighborhood}
                                </p>
                            </div>
                            <div>
                                <p className="text-sm text-gray-600">City/State</p>
                                <p className="text-base font-medium text-gray-900">
                                    {transaction.customer.address.city}, {transaction.customer.address.state}
                                </p>
                            </div>
                            <div>
                                <p className="text-sm text-gray-600">Country</p>
                                <p className="text-base font-medium text-gray-900">
                                    {transaction.customer.address.country}
                                </p>
                            </div>
                        </div>
                    </div>

                    <div className="rounded-lg bg-white p-6 shadow">
                        <div className="mb-4 flex items-center gap-2">
                            <CreditCard className="size-5 text-base-green" />
                            <h2 className="font-semibold text-gray-800">Payment Method</h2>
                        </div>
                        <div className="grid gap-6 md:grid-cols-2">
                            <div>
                                <p className="text-sm text-gray-600">Card Number</p>
                                <p className="text-base font-medium text-gray-900">
                                    {transaction.paymentMethod.card.firstDigits} •••• {transaction.paymentMethod.card.lastDigits}
                                </p>
                            </div>
                            <div>
                                <p className="text-sm text-gray-600">Card Holder</p>
                                <p className="text-base font-medium text-gray-900">
                                    {transaction.paymentMethod.card.holderName}
                                </p>
                            </div>
                            <div>
                                <p className="text-sm text-gray-600">Expiration Date</p>
                                <p className="text-base font-medium text-gray-900">
                                    {transaction.paymentMethod.card.expirationDate}
                                </p>
                            </div>
                            <div>
                                <p className="text-sm text-gray-600">Installments</p>
                                <p className="text-base font-medium text-gray-900">
                                    {transaction.paymentMethod.card.installments}x
                                </p>
                            </div>
                        </div>
                    </div>

                    <div className="rounded-lg bg-white p-6 shadow">
                        <h2 className="mb-4 text-lg font-semibold text-gray-800">Items</h2>
                        <div className="overflow-x-auto">
                            <table className="w-full">
                                <thead className="bg-gray-50">
                                    <tr>
                                        <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-600">
                                        Product
                                        </th>
                                        <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-600">
                                        Quantity
                                        </th>
                                        <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-600">
                                        Amount
                                        </th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-200 bg-white">
                                    {transaction.items.map((item: any, index: number) => (
                                        <tr key={index}>
                                            <td className="whitespace-nowrap px-6 py-4 text-sm font-medium text-gray-900">
                                                {item.name}
                                            </td>
                                            <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-600">
                                                {item.quantity}
                                            </td>
                                            <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-600">
                                                {formatCurrency(item.amount)}
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            ) : (
                <div className="rounded-lg bg-white p-6 shadow">
                    <div className="flex flex-col text-center ">
                        <span className="font-semibold text-base-green">
                            Transaction not avaliable
                        </span>
                        <span className="text-sm text-gray-800">
                            Please, return to checkout page and create a new transaction
                        </span>
                    </div>
                </div>
            )}
        </div>
    )
}