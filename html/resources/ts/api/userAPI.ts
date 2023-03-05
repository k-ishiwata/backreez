import axios from 'axios'
import type { SelectUser } from '@/types/User'

/**
 * セレクトボックス用ユーザー一覧
 */
const getSelectUsers = async () => {
    const { data } = await axios.get<SelectUser[]>('/api/users/select-list')

    return data.map(item => {
        return {
            value: String(item.value),
            label: item.label
        }
    })
}

export {
    getSelectUsers
}
