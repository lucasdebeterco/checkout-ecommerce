import { useQuery } from '@tanstack/react-query'
import { ClipboardList, CreditCard, MapPin, User } from 'lucide-react'
import { useParams } from 'react-router-dom'

import { getTransactionById } from '@/api/get-transaction-by-id.ts'
import { formatCurrency } from '@/utils/format-currency.ts'

export function TransactionDetails() {
    const { id } = useParams()

    const { data: transaction, isLoading } = useQuery({
        queryKey: [`transaction-${id}`],
        queryFn: () => getTransactionById(id ?? '')
    })

    console.log(transaction)

    if (isLoading) {
        return (
            <div className="flex min-h-[400px] items-center justify-center">
                <div className="size-8 animate-spin rounded-full border-b-2 border-blue-600"></div>
            </div>
        )
    }

    return (
        <div className="mx-auto max-w-4xl">
            <div className="mb-8 flex items-center gap-2">
                <ClipboardList className="size-6 text-base-green" />
                <h1 className="text-3xl font-bold text-gray-900">Transaction Details</h1>
            </div>

            <div className="space-y-6">
                <div className="rounded-lg bg-white p-6 shadow-md">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm text-gray-500">Transaction ID</p>
                            <p className="text-lg font-medium text-gray-900">{transaction.id}</p>
                        </div>
                        <div className="text-right">
                            <p className="text-sm text-gray-500">Amount</p>
                            <p className="text-lg font-medium text-gray-900">
                                {formatCurrency(transaction.amount)}
                            </p>
                        </div>
                    </div>
                    <div className="mt-4">
                        <span className={`rounded-full px-3 py-1 text-sm font-semibold ${
                            transaction.status === 'authorized'
                                ? 'bg-green-100 text-green-800'
                                : 'bg-red-100 text-red-800'
                        }`}>
                            {transaction.status}
                        </span>
                    </div>
                </div>

                <div className="rounded-lg bg-white p-6 shadow-md">
                    <div className="mb-4 flex items-center gap-2">
                        <User className="size-5 text-gray-600" />
                        <h2 className="text-xl font-semibold text-gray-800">Customer Information</h2>
                    </div>
                    <div className="grid gap-6 md:grid-cols-2">
                        <div>
                            <p className="text-sm text-gray-500">Name</p>
                            <p className="text-base font-medium text-gray-900">
                                {transaction.customer.firstName} {transaction.customer.lastName}
                            </p>
                        </div>
                        <div>
                            <p className="text-sm text-gray-500">{transaction.customer.document.type.toUpperCase()}</p>
                            <p className="text-base font-medium text-gray-900">
                                {transaction.customer.document.number}
                            </p>
                        </div>
                    </div>
                </div>

                <div className="rounded-lg bg-white p-6 shadow-md">
                    <div className="mb-4 flex items-center gap-2">
                        <MapPin className="size-5 text-gray-600" />
                        <h2 className="text-xl font-semibold text-gray-800">Address</h2>
                    </div>
                    <div className="grid gap-6 md:grid-cols-2">
                        <div>
                            <p className="text-sm text-gray-500">Street</p>
                            <p className="text-base font-medium text-gray-900">
                                {transaction.customer.address.street}, {transaction.customer.address.number}
                            </p>
                        </div>
                        <div>
                            <p className="text-sm text-gray-500">Neighborhood</p>
                            <p className="text-base font-medium text-gray-900">
                                {transaction.customer.address.neighborhood}
                            </p>
                        </div>
                        <div>
                            <p className="text-sm text-gray-500">City/State</p>
                            <p className="text-base font-medium text-gray-900">
                                {transaction.customer.address.city}, {transaction.customer.address.state}
                            </p>
                        </div>
                        <div>
                            <p className="text-sm text-gray-500">Country</p>
                            <p className="text-base font-medium text-gray-900">
                                {transaction.customer.address.country}
                            </p>
                        </div>
                    </div>
                </div>

                <div className="rounded-lg bg-white p-6 shadow-md">
                    <div className="mb-4 flex items-center gap-2">
                        <CreditCard className="size-5 text-gray-600" />
                        <h2 className="text-xl font-semibold text-gray-800">Payment Method</h2>
                    </div>
                    <div className="grid gap-6 md:grid-cols-2">
                        <div>
                            <p className="text-sm text-gray-500">Card Number</p>
                            <p className="text-base font-medium text-gray-900">
                                {transaction.paymentMethod.card.firstDigits} •••• {transaction.paymentMethod.card.lastDigits}
                            </p>
                        </div>
                        <div>
                            <p className="text-sm text-gray-500">Card Holder</p>
                            <p className="text-base font-medium text-gray-900">
                                {transaction.paymentMethod.card.holderName}
                            </p>
                        </div>
                        <div>
                            <p className="text-sm text-gray-500">Expiration Date</p>
                            <p className="text-base font-medium text-gray-900">
                                {transaction.paymentMethod.card.expirationDate}
                            </p>
                        </div>
                        <div>
                            <p className="text-sm text-gray-500">Installments</p>
                            <p className="text-base font-medium text-gray-900">
                                {transaction.paymentMethod.card.installments}x
                            </p>
                        </div>
                    </div>
                </div>

                <div className="rounded-lg bg-white p-6 shadow-md">
                    <h2 className="mb-4 text-xl font-semibold text-gray-800">Items</h2>
                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead className="bg-gray-50">
                                <tr>
                                    <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                                    Product
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                                    Quantity
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
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
                                        <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-500">
                                            {item.quantity}
                                        </td>
                                        <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-500">
                                            {formatCurrency(item.amount)}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    )
}