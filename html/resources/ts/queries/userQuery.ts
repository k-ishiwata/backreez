import * as api from '@/api/userAPI'
import { useQuery } from '@tanstack/react-query'

/**
 * セレクトボックス用ユーザー一覧
 */
const useSelectUsers = () => {
    return useQuery([`selectUsers`], api.getSelectUsers)
}

export {
    useSelectUsers
}
