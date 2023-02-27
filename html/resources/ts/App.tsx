import React, { useState } from 'react'
import { RouterProvider } from 'react-router-dom'
import { router } from './routes'
import {
    MantineProvider,
    ColorScheme,
    ColorSchemeProvider
} from '@mantine/core'
import { NotificationsProvider } from '@mantine/notifications'
import { ModalsProvider } from '@mantine/modals'
import {
    QueryClientProvider
} from '@tanstack/react-query'
import queryClient from '@/queries/queryClient'

const App: React.FC = () => {
    const [colorScheme, setColorScheme] = useState<ColorScheme>('light')
    const dark = colorScheme === 'dark'

    // ダークモード切り替え
    const toggleColorScheme = (value?: ColorScheme) => {
        const nextColorScheme = value || (colorScheme === 'dark' ? 'light' : 'dark')
        setColorScheme(nextColorScheme);
    }

    return (
        <QueryClientProvider client={queryClient}>
            <ColorSchemeProvider colorScheme={colorScheme} toggleColorScheme={toggleColorScheme}>
                <MantineProvider
                    theme={{
                        colorScheme,
                        primaryColor: 'blue',
                        other: {
                            secondaryBG: dark ? '#222' : '#fff',
                            line: `solid 1px ${dark ? '#373A40' : '#DEE2E6'}`
                        },
                    }}
                    withGlobalStyles
                    withNormalizeCSS
                >
                    <NotificationsProvider>
                        <ModalsProvider>
                            <RouterProvider router={router} />
                        </ModalsProvider>
                    </NotificationsProvider>
                </MantineProvider>
            </ColorSchemeProvider>
        </QueryClientProvider>
    )
}

export default App
