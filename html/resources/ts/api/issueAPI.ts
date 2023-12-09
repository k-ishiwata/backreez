import axios from 'axios'
import { IssueSchema } from '@/schemas/IssueSchema'
import { format } from 'date-fns'
import type { Issue, IssuePager } from '@/types/Issue'

const API_URI = '/api/issues'

const getIssues = async (request: object) => {
    const { data } = await axios.get<IssuePager>(API_URI, {
        params: request
    })

    data.data = data.data.map(({ due_at, created_at, updated_at, ...issue }) => ({
        ...issue,
        due_at: due_at && new Date(due_at),
        created_at: new Date(created_at),
        updated_at: new Date(updated_at),
    }));

    return data
}

const getIssue = async (id: number) => {
    const { data } = await axios.get<Issue>(`${API_URI}/${id}`)

    if (data) {
        data.due_at = data.due_at && new Date(data.due_at)
        data.created_at = new Date(data.created_at)
        data.updated_at = new Date(data.updated_at)
    }

    return data
}

const createIssue = async (issue: IssueSchema) => {
    const { data } = await axios.post(`${API_URI}`, {
        ...issue,
        due_at: issue?.due_at && format(issue.due_at, 'yyyy/MM/dd HH:mm')
    })
    return data
}

const updateIssue = async ({id, issue}: {
    id: number
    issue: IssueSchema
}) => {
    const { data } = await axios.put(`${API_URI}/${id}`, {
        ...issue,
        due_at: issue?.due_at && format(issue.due_at, 'yyyy/MM/dd HH:mm')
    })
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
