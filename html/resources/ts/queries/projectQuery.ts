import * as api from '@/api/projectAPI'
import { AxiosError } from 'axios'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { setValidationError } from '@/utils/axios'
import { toast } from 'react-toastify'
import type { ProjectSchema } from '@/schemas/ProjectSchema'
import type { UseFormSetError } from 'react-hook-form/dist/types/form'

const useProject = (key: string) => {
    return useQuery([`project`, key], () => api.getProject(key))
}

const useProjects = (page?: number) => {
    return useQuery([`projects`, page], () => api.getProjects(page))
}

const useCreateProject = (
    setError:  UseFormSetError<ProjectSchema>
) => {
    const queryClient = useQueryClient()

    return useMutation(api.createProject, {
        onError: (error: AxiosError) => {
            toast.error('データの登録に失敗しました。')
            setValidationError(error, setError)
        },
        onSuccess: () => {
            toast.success('データの登録に成功しました。')
            queryClient.invalidateQueries(['projects'])
        }
    })
}

const useUpdateProject = (
    setError:  UseFormSetError<ProjectSchema>
) => {
    const queryClient = useQueryClient()

    return useMutation(api.updateProject, {
        onError: (error: AxiosError) => {
            toast.error('データの更新に失敗しました。')
            setValidationError(error, setError)
        },
        onSuccess: () => {
            toast.success('データの更新に成功しました。')
            queryClient.invalidateQueries(['projects'])
        }
    })
}

const useDeleteProject = () => {
    const queryClient = useQueryClient()

    return useMutation(api.deleteProject, {
        onError: (error: AxiosError) => {
            console.log(error.response)
            toast.error('データの削除に失敗しました。')
        },
        onSuccess: () => {
            toast.success('データの削除に成功しました。')
            queryClient.invalidateQueries(['projects'])
        }
    })
}

export {
    useProject,
    useProjects,
    useCreateProject,
    useUpdateProject,
    useDeleteProject
}
