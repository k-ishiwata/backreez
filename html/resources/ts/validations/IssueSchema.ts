import { z } from 'zod'

export const issueSchema = z.object({
    subject: z.string()
        .min(1, { message: '必ず入力してください。'})
        .max(255, { message: '255文字以内で入力してください。'}),
    body: z.string()
        .min(1, { message: '必ず入力してください。'})
        .max(4000, { message: '4000文字以内で入力してください。'}),
    status_id: z.number().nullish(),
    priority_id: z.number().nullish(),
    due_at: z.date().nullish(),
    project_key: z.string().nullish(),
    user_id: z.number().nullish(),
})

export type IssueSchema = z.infer<typeof issueSchema>
