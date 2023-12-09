import React from 'react'
import { globalStyles } from '@/assets/globalStyles'
import { RouterProvider } from 'react-router-dom'
import { router } from './routes'
import { QueryClientProvider } from '@tanstack/react-query'
import queryClient from '@/queries/queryClient'
import { useLoading } from '@/hooks/loading'
import { ToastContainer } from 'react-toastify'
import { DeleteConfirmDialog, LoadingOverlay } from '@/components'
import 'react-toastify/dist/ReactToastify.css'
import 'react-datepicker/dist/react-datepicker.css'

const App: React.FC = () => {
    globalStyles()

    // ローディング状態
    const { isLoading } = useLoading()

    return (
        <QueryClientProvider client={queryClient}>
            <LoadingOverlay isVisible={isLoading} />
            <RouterProvider router={router} />
            <DeleteConfirmDialog />
            <ToastContainer
                position="bottom-right"
                autoClose={3000}
            />
        </QueryClientProvider>
    )
}

export default App
