import axios from 'axios'
import { IssueSchema } from '@/schemas/IssueSchema'
import { format } from 'date-fns'
import type { Issue, IssuePager } from '@/types/Issue'

const API_URI = '/api/issues'

const castResponse = ({ due_at, created_at, updated_at, ...issue }: Issue): Issue => {
    return {
        ...issue,
        due_at: due_at && new Date(due_at),
        created_at: new Date(created_at),
        updated_at: new Date(updated_at),
    }
}

const castRequest = (issue: IssueSchema): Object => {
    return {
        ...issue,
        due_at: issue?.due_at && format(issue.due_at, 'yyyy/MM/dd HH:mm'),
    }
}

const getIssues = async (request: object) => {
    const { data } = await axios.get<IssuePager>(API_URI, {
        params: request
    })
    data.data = data.data.map(issue => castResponse(issue))
    return data
}

const getIssue = async (id: number) => {
    const { data } = await axios.get<Issue>(`${API_URI}/${id}`)
    return castResponse(data)
}

const createIssue = async (issue: IssueSchema) => {
    const { data } = await axios.post(`${API_URI}`, castRequest(issue))
    return data
}

const updateIssue = async ({id, issue}: {
    id: number
    issue: IssueSchema
}) => {
    const { data } = await axios.put(`${API_URI}/${id}`, castRequest(issue))
    return data
}

const deleteIssue = async (id: number) => {
    const { data } = await axios.delete<Issue>(`${API_URI}/${id}`)
    return data
}

export {
    getIssues,
    getIssue,
    createIssue,
    updateIssue,
    deleteIssue
}
