import * as api from '@/api/projectAPI'
import { useQuery, useMutation, useQueryClient } from 'react-query'
import { AxiosError } from 'axios'

const useProjects = (page?: number) => {
    return useQuery([`projects`, page], () => api.getProjects(page))
}

const useCreateProject = () => {
    const queryClient = useQueryClient()

    return useMutation(api.createProject, {
        onError: (error: AxiosError) => {
            console.log(error.response)
        },
        onSuccess: () => {
            queryClient.invalidateQueries('projects')
        }
    })
}

const useUpdateProject = () => {
    const queryClient = useQueryClient()

    return useMutation(api.updateProject, {
        onError: (error: AxiosError) => {
            console.log(error.response)
        },
        onSuccess: () => {
            queryClient.invalidateQueries('projects')
        }
    })
}

const useDeleteProject = () => {
    const queryClient = useQueryClient()

    return useMutation(api.deleteProject, {
        onError: (error: AxiosError) => {
            console.log(error.response)
        },
        onSuccess: () => {
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
