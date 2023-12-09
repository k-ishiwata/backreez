import React from 'react'
import { globalStyles } from '@/assets/globalStyles'
import { RouterProvider } from 'react-router-dom'
import { router } from './routes'
import {
    MantineProvider,
    LoadingOverlay
} from '@mantine/core'
import { ModalsProvider } from '@mantine/modals'
import {
    QueryClientProvider
} from '@tanstack/react-query'
import queryClient from '@/queries/queryClient'
import { useLoading } from '@/hooks/loading'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import 'react-datepicker/dist/react-datepicker.css'

const App: React.FC = () => {
    globalStyles()

    // ローディング状態
    const { isLoading } = useLoading()

    return (
        <QueryClientProvider client={queryClient}>
            <MantineProvider>
                <ModalsProvider>
                <LoadingOverlay visible={isLoading} overlayBlur={2} />
                <RouterProvider router={router} />
                <ToastContainer
                    position="bottom-right"
                    autoClose={3000}
                />
                </ModalsProvider>
            </MantineProvider>
        </QueryClientProvider>
    )
}

export default App
