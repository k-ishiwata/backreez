import axios from 'axios'
import type { Issue, IssuePager } from '@/types/Issue'
const API_URI = '/api/issues'

const getIssues = async (request: object) => {
    const { data } = await axios.get<IssuePager>(API_URI, {
        params: request
    })
    return data
}

const getIssue = async (id: number) => {
    const { data } = await axios.get<Issue>(`${API_URI}/${id}`)
    return data
}

export {
    getIssues,
    getIssue
}
