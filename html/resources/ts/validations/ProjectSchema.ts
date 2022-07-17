import { z } from 'zod'

export const projectSchema = z.object({
    key:  z.string()
        .min(1, { message: '必ず入力してください。'})
        .max(10, { message: '10文字以内で入力してください。'}),
    name: z.string()
        .min(1, { message: '必ず入力してください。'})
        .max(30, { message: '30文字以内で入力してください。'}),
    description: z.string()
        .max(255, { message: '255文字以内で入力してください。'})
})

export type ProjectSchema = z.infer<typeof projectSchema>
