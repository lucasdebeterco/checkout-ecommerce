import { CheckoutFormData } from '@/pages/checkout/schemas/checkout-form-schema.ts'

export async function postTransaction(data: CheckoutFormData) {
    const response = await fetch('/api/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
    })

    return await response.json()
}