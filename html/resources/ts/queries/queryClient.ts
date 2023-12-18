import { QueryClient } from '@tanstack/react-query'

const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            retry: false,
            // Windowフォーカス時再取得しない
            refetchOnWindowFocus: false,
            // キャッシュを使用する
            staleTime: Infinity,
        },
        mutations: {
            retry: false
        }
    }
})

export default queryClient
