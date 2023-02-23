import * as api from '@/api/projectAPI'
import { AxiosError } from 'axios'
import { closeAllModals } from '@mantine/modals'
import { showNotification } from '@mantine/notifications'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { successMessage, errorMessage } from '@/utils/notificationMessages'
import { setValidationError } from '@/utils/axios'
import type { ProjectSchema } from '@/validations/ProjectSchema'
import type { UseFormSetError } from 'react-hook-form/dist/types/form'

const useProjects = (page?: number) => {
    return useQuery([`projects`, page], () => api.getProjects(page))
}

const useCreateProject = (
    setError:  UseFormSetError<ProjectSchema>
) => {
    const queryClient = useQueryClient()

    return useMutation(api.createProject, {
        onError: (error: AxiosError) => {
            showNotification(errorMessage('データの登録に失敗しました。'))
            setValidationError(error, setError)
        },
        onSuccess: () => {
            showNotification(successMessage('データの登録に成功しました。'))
            queryClient.invalidateQueries(['projects'])

            closeAllModals()
        }
    })
}

const useUpdateProject = (
    setError:  UseFormSetError<ProjectSchema>
) => {
    const queryClient = useQueryClient()

    return useMutation(api.updateProject, {
        onError: (error: AxiosError) => {
            showNotification(errorMessage('データの更新に失敗しました。'))
            setValidationError(error, setError)
        },
        onSuccess: () => {
            showNotification(successMessage('データの更新に成功しました。'))
            queryClient.invalidateQueries(['projects'])

            closeAllModals()
        }
    })
}

const useDeleteProject = () => {
    const queryClient = useQueryClient()

    return useMutation(api.deleteProject, {
        onError: (error: AxiosError) => {
            console.log(error.response)
            showNotification(errorMessage('データの削除に失敗しました。'))
        },
        onSuccess: () => {
            showNotification(successMessage('データの削除に成功しました。'))
            queryClient.invalidateQueries(['projects'])
        }
    })
}

export {
    useProjects,
    useCreateProject,
    useUpdateProject,
    useDeleteProject
}
