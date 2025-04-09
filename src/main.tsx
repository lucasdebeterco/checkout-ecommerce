import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'

import App from './App.tsx'
import { makeServer } from './lib/mock-api.ts'
import { queryClient, QueryClientProvider } from './lib/query-client.ts'

makeServer()

createRoot(document.getElementById('root')!).render(
    <StrictMode>
        <QueryClientProvider client={queryClient}>
            <BrowserRouter>
                <App />
            </BrowserRouter>
        </QueryClientProvider>
        <ToastContainer />
    </StrictMode> as React.ReactElement
)
