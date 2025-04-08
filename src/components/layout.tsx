import { ShoppingCart } from 'lucide-react'
import { Link, Outlet } from 'react-router-dom'

export function Layout() {
    return (
        <div className="min-h-screen bg-gray-50">
            <header className="bg-white shadow-sm">
                <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
                    <Link to="/" className="flex items-center">
                        <ShoppingCart className="size-8 text-indigo-600" />
                        <span className="ml-2 text-xl font-semibold text-gray-900">E-commerce</span>
                    </Link>

                    <div>
                        <Link to="/transactions">Transactions</Link>
                    </div>
                </div>
            </header>
            
            <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
                <Outlet />
            </main>
        </div>
    )
}