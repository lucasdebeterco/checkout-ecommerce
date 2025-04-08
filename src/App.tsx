import { Route,Routes } from 'react-router-dom'

import { Layout } from './components/layout.tsx'
import { Checkout } from './pages/checkout/checkout'
import { TransactionDetails } from './pages/transaction-details.tsx'
import { TransactionList } from './pages/transaction-list.tsx'

function App() {
    return (
        <Routes>
            <Route element={<Layout />}>
                <Route path="/" element={<Checkout />} />
                <Route path="/transactions" element={<TransactionList />} />
                <Route path="/transactions/:id" element={<TransactionDetails />} />
            </Route>
        </Routes>
    )
}

export default App
