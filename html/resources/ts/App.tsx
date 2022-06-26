import React, { useState } from 'react'
import { useRoutes } from 'react-router-dom'
import { routes } from './routes'
import {
    MantineProvider,
    ColorScheme,
    ColorSchemeProvider
} from '@mantine/core'
import {
    QueryClient,
    QueryClientProvider
} from 'react-query'

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

    // ダークモード切り替え
    const toggleColorScheme = (value?: ColorScheme) => {
        const nextColorScheme = value || (colorScheme === 'dark' ? 'light' : 'dark');
        setColorScheme(nextColorScheme);
    };

    return (
        <QueryClientProvider client={queryClient}>
            <ColorSchemeProvider colorScheme={colorScheme} toggleColorScheme={toggleColorScheme}>
                <MantineProvider
                    theme={{ colorScheme }}
                    withGlobalStyles
                    withNormalizeCSS
                >
                    <div>{router}</div>
                </MantineProvider>
            </ColorSchemeProvider>
        </QueryClientProvider>
    )
}

export default App
