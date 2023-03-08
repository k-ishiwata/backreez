import React from 'react'
import { createRoot } from 'react-dom/client'
import App from '@/App'
import { LoadingProvider } from '@/hooks/loading'

const root = createRoot(
    document.getElementById('app') as HTMLElement
)

root.render(
    <React.StrictMode>
        <LoadingProvider>
            <App />
        </LoadingProvider>
    </React.StrictMode>
)
