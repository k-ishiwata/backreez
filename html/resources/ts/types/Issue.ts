export type Issue = {
    id: number
    title: string
    body?: string
    status: number
    user: string
    due_at: Date
    created_at: Date
}

export type IssueStatus = {
    label: string
    color: string
}
  