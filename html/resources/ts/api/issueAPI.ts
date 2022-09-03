import axios from 'axios'
import type { IssuePager } from '@/types/Issue'
const API_URI = '/api/issues'

const getIssues = async (request: object) => {
    const { data } = await axios.get<IssuePager>(API_URI, {
        params: request
    })
    return data
}

export {
    getIssues,
}
