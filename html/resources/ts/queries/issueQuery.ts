import * as api from '@/api/issueAPI'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { UseFormSetError } from 'react-hook-form/dist/types/form'
import { AxiosError } from 'axios'
import { toast } from 'react-toastify'
import { setValidationError } from '@/utils/axios'
import type { IssueSchema } from '@/schemas/IssueSchema'

const useIssues = (request: object, page?: number) => {
    return useQuery([`issues`, request, page], () => api.getIssues({...request, page: page}))
}

const useIssue = (id: number) => {
    return useQuery([`issue`, id], () => api.getIssue(id))
}

const useCreateIssue = (
    setError:  UseFormSetError<IssueSchema>
) => {
    const queryClient = useQueryClient()

    return useMutation(api.createIssue, {
        onError: (error: AxiosError) => {
            toast.error('データの登録に失敗しました。')
            setValidationError(error, setError)
        },
        onSuccess: () => {
            toast.success('データの登録に成功しました。')
            queryClient.invalidateQueries(['issues'])
        }
    })
}

const useUpdateIssue = (
    setError:  UseFormSetError<IssueSchema>
) => {
    const queryClient = useQueryClient()

    return useMutation(api.updateIssue, {
        onError: (error: AxiosError) => {
            toast.error('データの更新に失敗しました。')
            setValidationError(error, setError)
        },
        onSuccess: (data, variables) => {
            toast.success('データの更新に成功しました。')
            queryClient.invalidateQueries(['issues'])
            queryClient.invalidateQueries(['issue', variables.id])
        }
    })
}

const useDeleteIssue = () => {
    const queryClient = useQueryClient()

    return useMutation(api.deleteIssue, {
        onError: (error: AxiosError) => {
            toast.error('データの削除に失敗しました。')
        },
        onSuccess: () => {
            toast.success('データの削除に成功しました。')
            queryClient.invalidateQueries(['issues'])
        }
    })
}

export {
    useIssues,
    useIssue,
    useCreateIssue,
    useUpdateIssue,
    useDeleteIssue
}
