import axios from 'axios'
import type { SelectUser } from '@/types/User'

/**
 * セレクトボックス用課題ステータス一覧
 */
const getSelectIssueStatuses = async () => {
    const { data } = await axios.get<SelectUser[]>('/api/issue-statuses/select-list')

    return data.map(item => {
        return {
            value: String(item.value),
            label: item.label
        }
    })
}

export {
    getSelectIssueStatuses
}
