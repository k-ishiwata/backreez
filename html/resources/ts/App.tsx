import React, { useState } from 'react'
import { useRoutes } from 'react-router-dom'
import { routes } from './routes'
import {
    MantineProvider,
    ColorScheme,
    ColorSchemeProvider
} from '@mantine/core'
import { NotificationsProvider } from '@mantine/notifications'
import { ModalsProvider } from '@mantine/modals'
import {
    QueryClient,
    QueryClientProvider
} from '@tanstack/react-query'

const App: React.FC = () => {
    const router = useRoutes(routes)
    const queryClient = new QueryClient({
        defaultOptions: {
            queries: {
                retry: false,
                // Windowフォーカス時再取得しない
                refetchOnWindowFocus: false
            },
            mutations: {
                retry: false
            }
        }
    })

    const [colorScheme, setColorScheme] = useState<ColorScheme>('light')
    const dark = colorScheme === 'dark'

    // ダークモード切り替え
    const toggleColorScheme = (value?: ColorScheme) => {
        const nextColorScheme = value || (colorScheme === 'dark' ? 'light' : 'dark')
        setColorScheme(nextColorScheme);
    };

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
                            <div>{router}</div>
                        </ModalsProvider>
                    </NotificationsProvider>
                </MantineProvider>
            </ColorSchemeProvider>
        </QueryClientProvider>
    )
}

export default App
