import * as api from '@/api/issueStatusAPI'
import { useQuery } from '@tanstack/react-query'

/**
 * セレクトボックス用一覧
 */
const useSelectIssueStatuses = () => {
    return useQuery(['selectIssueStatuses'], api.getSelectIssueStatuses)
}

export {
    useSelectIssueStatuses
}
