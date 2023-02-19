import axios from 'axios'
import { IssueSchema } from "@/validations/IssueSchema"
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

const createIssue = async (issue: IssueSchema) => {
    const { data } = await axios.post(`${API_URI}`, issue)
    return data
}

const updateIssue = async ({id, issue}: {
    id: number
    issue: IssueSchema
}) => {
    const { data } = await axios.put(`${API_URI}/${id}`, issue)
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
