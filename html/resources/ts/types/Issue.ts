import { Pager } from "@/types/Pager"

export type IssueStatus = {
    id: number
    name: string
    color: string
}

export type Issue = {
    id: number
    subject: string
    body?: string
    status_id: number
    status: IssueStatus
    project_key: string
    priority_id?: number
    user: string
    due_at?: Date
    created_at: Date
    updated_at: Date
}

export type IssuePager = Pager & {
    data: Issue[]
}
