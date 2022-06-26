import { useQuery } from 'react-query'
import * as api from '@/api/projects'

const useProjects = (page?: number) => {
    return useQuery([`projects`, page], () => api.getProjects(page))
}

export {
    useProjects
}
