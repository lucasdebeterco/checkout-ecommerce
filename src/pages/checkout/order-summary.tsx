import { ShoppingCart } from 'lucide-react'
import { UseFormSetValue } from 'react-hook-form'

import { cartMock } from '@/pages/checkout/mocks/cart-mock.ts'
import { formatCurrency } from '@/utils/format-currency.ts'

interface OrderSummaryProps {
    setValue: UseFormSetValue<any>
}

export function OrderSummary({ setValue }: OrderSummaryProps) {
    const total = cartMock.reduce((sum, item) => sum + item.amount * item.quantity, 0)

    setValue('amount', total)
    setValue('items', cartMock.map((item) => ({
        name: item.name,
        quantity: item.quantity,
        amount: item.amount,
    })))
    
    return (
        <div className="lg:col-span-1">
            <div className="sticky top-4 rounded-lg bg-white p-6 shadow">
                <div className="mb-6 flex items-center gap-2">
                    <ShoppingCart className="size-5 text-base-green" />
                    <h2 className="text-gray-800 font-semibold">Order Summary</h2>
                </div>

                <div className="space-y-4">
                    {cartMock.map((item) => (<div key={item.id} className="flex gap-4">
                        <img
                            src={item.image}
                            alt={item.name}
                            className="size-20 rounded object-cover"
                        />
                        <div>
                            <h3 className="font-medium text-gray-800">{item.name}</h3>
                            <p className="text-gray-600 text-sm">Quantity: {item.quantity}</p>
                            <p className="font-medium text-gray-800">{formatCurrency(item.amount)}</p>
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
    )
}