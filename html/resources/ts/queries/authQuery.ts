import * as api from '@/api/authAPI'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { AxiosError } from 'axios'
import { toast } from 'react-toastify'
import queryClient from '@/queries/queryClient'
import { setValidationError } from '@/utils/axios'
import { UseFormSetError } from 'react-hook-form/dist/types/form'
import { useLoading } from '@/hooks/loading'
import type { Login } from '@/types/User'

const useUser = () => {
    return useQuery(['user'], api.getUser)
}

const getAuthUser = async () => {
    const query = userQuery()

    return queryClient.getQueryData(query.queryKey)
        ?? (await queryClient.fetchQuery(query).catch(() => undefined))
}

const userQuery = () => ({
    queryKey: ['user'],
    queryFn: api.getUser,
})

const useLogin = (
    setError:  UseFormSetError<Login>
) => {
    const queryClient = useQueryClient()
    const { setIsLoading } = useLoading()

    return useMutation(api.login, {
        onMutate: () => {
            setIsLoading(true)
        },
        onError: (error: AxiosError) => {
            toast.error('ログインに失敗しました。')
            setValidationError(error, setError)
            setIsLoading(false)
        },
        onSuccess: () => {
            queryClient.invalidateQueries(['user'])
            window.location.href = '/'
        }
    })
}

const useLogout = () => {
    const queryClient = useQueryClient()
    const { setIsLoading } = useLoading()

    return useMutation(api.logout, {
        onMutate: () => {
            setIsLoading(true)
        },
        onError: () => {
            setIsLoading(false)
            toast.error('ログアウトに失敗しました。')
        },
        onSuccess: () => {
            queryClient.invalidateQueries(['user'])
            window.location.href = '/login'
        }
    })
}

export {
    useUser,
    userQuery,
    getAuthUser,
    useLogin,
    useLogout,
}
