import { useQuery } from '@tanstack/react-query'
import { MoreHorizontal } from 'lucide-react'
import { useNavigate } from 'react-router'
import { toast } from 'react-toastify'

import { Button } from '@/components/ui/button'
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Loader } from '@/components/ui/loader.tsx'
import { TransactionStatus } from '@/enums/transaction-status.ts'

import { getTransactions } from '../api/get-transactions.ts'

export type Payment = {
    id: string
    amount: number
    status: 'pending' | 'processing' | 'success' | 'failed'
}

export function TransactionList() {
    const navigate = useNavigate()

    const { data: apiData, isLoading } = useQuery({
        queryKey: ['transactions'],
        queryFn: () => getTransactions()
    })

    // TODO - Tipar transaction
    const data: Payment[] = apiData?.transactions?.map(((transaction: any) => ({
        id: transaction.id,
        status: transaction.status,
        paymentMethod: transaction.paymentMethod.type
    })))

    if (isLoading) return <Loader />

    return (
        <div className="mx-auto flex max-w-4xl flex-col">
            <div className="w-full">
                <div className="rounded-lg bg-white p-6 shadow">
                    <h2 className="mb-4 text-xl font-semibold text-gray-800">Transactions List</h2>
                    {data.length ? (
                        <div className="overflow-x-auto">
                            <table className="w-full">
                                <thead className="bg-gray-50">
                                    <tr>
                                        <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-600">
                                            Transaction ID
                                        </th>
                                        <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-600">
                                            Payment Method
                                        </th>
                                        <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-600">
                                            Status
                                        </th>
                                        <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-600"></th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-200 bg-white">
                                    {/* TODO - Passar no projeto removendo todos os ANY */}
                                    {data.map((item: any) => (<tr key={item.id}>
                                        <td className="whitespace-nowrap px-6 py-4 text-sm font-medium text-gray-900">
                                            {item.id}
                                        </td>
                                        <td className="whitespace-nowrap px-6 py-4 text-sm capitalize text-gray-600">
                                            {item.paymentMethod}
                                        </td>
                                        <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-600">
                                            <span
                                                className={`rounded-full px-3 py-1 text-sm font-semibold ${item.status === TransactionStatus.AUTHORIZED ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                                                {item.status}
                                            </span>
                                        </td>
                                        <td>
                                            <DropdownMenu>
                                                <DropdownMenuTrigger asChild>
                                                    <Button variant="ghost" className="size-8 p-0">
                                                        <span className="sr-only">Open menu</span>
                                                        <MoreHorizontal className="text-gray-700"/>
                                                    </Button>
                                                </DropdownMenuTrigger>
                                                <DropdownMenuContent align="end">
                                                    <DropdownMenuLabel>Actions</DropdownMenuLabel>
                                                    <DropdownMenuItem onClick={() => {
                                                        navigator.clipboard.writeText(item.id)
                                                        toast.info('Transction ID copied')
                                                    }}>
                                                        Copy payment ID
                                                    </DropdownMenuItem>
                                                    <DropdownMenuSeparator/>
                                                    <DropdownMenuItem onClick={() => {
                                                        navigate(`/transactions/${item.id}`)
                                                    }}>
                                                        View payment details
                                                    </DropdownMenuItem>
                                                </DropdownMenuContent>
                                            </DropdownMenu>
                                        </td>
                                    </tr>))}
                                </tbody>
                            </table>
                        </div>
                    ) : (
                        <div className="flex flex-col text-center ">
                            <span className="font-semibold text-base-green">
                                Any transaction avaliable
                            </span>
                            <span className="text-sm text-gray-800">
                                Please, return to checkout page and create a new transaction
                            </span>
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}