import * as api from '@/api/issueAPI'
import { useQuery } from 'react-query'

const useIssues = (request: object, page?: number) => {
    return useQuery([`issues`, page], () => api.getIssues({...request, page: page}))
}

export {
    useIssues,
}
