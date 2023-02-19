import React from 'react'
import {
    Group,
    Stack,
    Button,
    Select,
    Textarea,
    TextInput
} from '@mantine/core'
import { closeAllModals } from '@mantine/modals'
import { prioritySelect } from '@/components/elements/Priority'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm, SubmitHandler, Controller } from 'react-hook-form'
import {
    useCreateIssue,
    useUpdateIssue
} from '@/queries/issueQuery'
import { issueSchema } from '@/validations/IssueSchema'
import type { Issue } from 'types/Issue'
import type { IssueSchema } from '@/validations/IssueSchema'
import dayjs from 'dayjs'
import ja from 'dayjs/locale/ja'
dayjs.locale(ja)

type Props = {
    editItem?: Issue | null
}

export const InputModal: React.FC<Props> = ({
    editItem
}) => {
    const {
        register, handleSubmit, formState: { errors }, setError, control
    } = useForm<IssueSchema>({
        resolver: zodResolver(issueSchema)
    })

    const updateIssue = useUpdateIssue(setError)
    const createIssue = useCreateIssue(setError)

    const onSubmit: SubmitHandler<IssueSchema> = data => {
        // editItemがある場合は更新
        if (editItem) {
            updateIssue.mutate({
                id: editItem.id,
                issue: {...editItem, ...data}
            })
        } else {
            createIssue.mutate(data)
        }
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <Stack>
                <TextInput
                    required
                    label="タイトル"
                    error={errors.subject?.message}
                    defaultValue={editItem?.subject}
                    {...register('subject')}
                />
                <Textarea
                    label="内容"
                    autosize
                    minRows={15}
                    error={errors.body?.message}
                    defaultValue={editItem?.body}
                    {...register('body')}
                />

                <Group>
                    <Controller
                        control={control}
                        name="status_id"
                        defaultValue={String(editItem?.status_id)}
                        render={({
                            field: { onChange, value, name },
                        }) => (
                            <Select
                                name={name}
                                value={value}
                                onChange={onChange}
                                label="ステータス"
                                data={[
                                    { value: '1', label: '未対応' },
                                    { value: '2', label: '進行中' },
                                    { value: '3', label: '処理済み' },
                                    { value: '4', label: '完了' },
                                ]}
                                error={errors.status_id?.message}
                            />
                        )}
                    />

                    <Controller
                        control={control}
                        name="priority_id"
                        defaultValue={editItem?.priority_id}
                        render={({
                            field: { onChange, value, name },
                        }) => (
                            <Select
                                name={name}
                                value={String(value)}
                                onChange={(item) => onChange(Number(item))}
                                label="優先度"
                                data={prioritySelect}
                                error={errors.priority_id?.message}
                                clearable
                            />
                        )}
                    />

                    <TextInput
                        label="期限"
                        type="datetime-local"
                        defaultValue={dayjs(editItem?.due_at).format('YYYY-MM-DD HH:mm:00')}
                        {...register('due_at')}
                        error={errors.due_at?.message}
                    />
                </Group>
            </Stack>
            <Group spacing="xs" mt="lg">
                <Button type="submit">保存</Button>
                <Button variant="outline" onClick={() => closeAllModals()}>キャンセル</Button>
            </Group>
        </form>
    )
}
