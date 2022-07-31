import * as api from '@/api/projectAPI'
import { useQuery, useMutation, useQueryClient } from 'react-query'
import { AxiosError } from 'axios'
import { showNotification } from '@mantine/notifications'
import { successMessage, errorMessage } from '@/utils/notificationMessages'

const useProjects = (page?: number) => {
    return useQuery([`projects`, page], () => api.getProjects(page))
}

const useCreateProject = () => {
    const queryClient = useQueryClient()

    return useMutation(api.createProject, {
        onError: (error: AxiosError) => {
            console.log(error.response)
            showNotification(errorMessage('データの登録に失敗しました。'))
        },
        onSuccess: () => {
            showNotification(successMessage('データの登録に成功しました。'))
            queryClient.invalidateQueries('projects')
        }
    })
}

const useUpdateProject = () => {
    const queryClient = useQueryClient()

    return useMutation(api.updateProject, {
        onError: (error: AxiosError) => {
            console.log(error.response)
            showNotification(errorMessage('データの更新に失敗しました。'))
        },
        onSuccess: () => {
            showNotification(successMessage('データの更新に成功しました。'))
            queryClient.invalidateQueries('projects')
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
            queryClient.invalidateQueries('projects')
        }
    })
}

export {
    useProjects,
    useCreateProject,
    useUpdateProject,
    useDeleteProject
}
