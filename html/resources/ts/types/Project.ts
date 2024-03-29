import { Pager } from './Pager'

export type Project = {
    id: number
    key: string
    name: string
    description?: string
    updated_at: Date
    created_at: Date
}

export type ProjectPager = Pager & {
    data: Project[]
}
