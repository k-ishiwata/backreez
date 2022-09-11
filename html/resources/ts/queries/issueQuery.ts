import * as api from '@/api/issueAPI'
import { useQuery } from 'react-query'

const useIssues = (request: object, page?: number) => {
    return useQuery([`issues`, page], () => api.getIssues({...request, page: page}))
}

const useIssue = (id: number) => {
    return useQuery([`issue`, id], () => api.getIssue(id))
}

export {
    useIssues,
    useIssue
}
