import React from 'react'
import { globalStyles } from '@/assets/globalStyles'
import { RouterProvider } from 'react-router-dom'
import { router } from './routes'
import {
    MantineProvider,
    LoadingOverlay
} from '@mantine/core'
import { Notifications } from '@mantine/notifications'
import { ModalsProvider } from '@mantine/modals'
import {
    QueryClientProvider
} from '@tanstack/react-query'
import queryClient from '@/queries/queryClient'
import { useLoading } from '@/hooks/loading'

const App: React.FC = () => {
    globalStyles()

    // ローディング状態
    const { isLoading } = useLoading()

    return (
        <QueryClientProvider client={queryClient}>
            <MantineProvider>
                <ModalsProvider>
                    <Notifications />
                    <LoadingOverlay visible={isLoading} overlayBlur={2} />
                    <RouterProvider router={router} />
                </ModalsProvider>
            </MantineProvider>
        </QueryClientProvider>
    )
}

export default App
