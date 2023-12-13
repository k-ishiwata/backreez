import React, { useEffect } from 'react'
import { Button } from '@/components'
import {
    Input,
    Label,
    Textarea,
    Select,
    UserSelect,
    DatePicker
} from '@/components/form'
import { Group, Stack } from '@/components/layouts'
import { prioritySelect, BaseModal } from '@/components'
import { useInputModal } from '@/hooks/modal'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm, SubmitHandler, Controller } from 'react-hook-form'
import {
    useCreateIssue,
    useUpdateIssue
} from '@/queries/issueQuery'
import { issueSchema } from '@/schemas/IssueSchema'
import type { Issue } from 'types/Issue'
import type { IssueSchema } from '@/schemas/IssueSchema'

type Props = {
    projectKey?: string
    // 一覧から開く場合はtrue
    isListMode?: boolean
    isScroll?: boolean
}

export const InputModal: React.FC<Props> = ({
    projectKey,
    isListMode = false,
    isScroll = true,
}) => {
    const {
        item: issue,
        isVisible,
        closeModal
    } = useInputModal<Issue|undefined>('issue')

    // 一覧での表示はbody表示しない
    const schema = isListMode
        ? issueSchema.omit({ body: true })
        : issueSchema

    const {
        register, handleSubmit, formState: { errors }, setValue, setError, control, clearErrors
    } = useForm<IssueSchema>({
        resolver: zodResolver(schema)
    })

    const updateIssue = useUpdateIssue(setError)
    const createIssue = useCreateIssue(setError)

    useEffect(() => {
        clearErrors()
        setValue('subject', issue?.subject || '')
        setValue('body', issue?.body || '')
        setValue('status_id', issue?.status_id || 1)
        setValue('priority_id', issue?.priority_id || undefined)
        setValue('due_at', issue?.due_at)
        setValue('user_id', issue?.user_id || undefined)
    }, [issue])

    const onSubmit: SubmitHandler<IssueSchema> = data => {
        // editItemがある場合は更新
        if (issue) {
            updateIssue.mutate({
                id: issue.id,
                issue: {...issue, ...data}
            }, {
                onSuccess: closeModal
            })
        } else {
            data.project_key = projectKey
            createIssue.mutate(data, {
                onSuccess: closeModal
            })
        }
    }

    return (
        <BaseModal
            title={`課題${issue ? '編集' : '登録'}`}
            handleCloseModal={closeModal}
            isVisible={isVisible}
            isScroll={isScroll}
        >
            <form onSubmit={handleSubmit(onSubmit)}>
                <Stack>
                    <div>
                        <Label required>タイトル</Label>
                        <Input
                            type="text"
                            {...register('subject')}
                            error={!!errors.subject}
                            required
                        />
                        { errors.subject && <Label error>{errors.subject.message}</Label> }
                    </div>

                    {
                        ! isListMode &&
                        <div>
                            <Label required>内容</Label>
                            <Textarea
                                {...register('body')}
                                error={!!errors.body}
                                required
                                rows={15}
                            />
                            { errors.body && <Label error>{errors.body.message}</Label> }
                        </div>
                    }

                    <Group>
                        <Group.Col>
                            <Label>ステータス</Label>
                            <Select
                                {...register('status_id', { valueAsNumber: true })}
                                error={!!errors.status_id}
                                required
                                data={[
                                    { value: '1', label: '未対応' },
                                    { value: '2', label: '進行中' },
                                    { value: '3', label: '処理済み' },
                                    { value: '4', label: '完了' },
                                ]}
                            />
                            { errors.status_id && <Label error>{errors.status_id.message}</Label> }
                        </Group.Col>
                        <Group.Col>
                            <Label>優先度</Label>
                            <Select
                                {...register('priority_id', {
                                    setValueAs: v => v === '' ? null : parseInt(v),
                                })}
                                error={!!errors.priority_id}
                                data={prioritySelect}
                            />
                            { errors.priority_id && <Label error>{errors.priority_id.message}</Label> }
                        </Group.Col>
                        <Group.Col>
                            <Label>期限</Label>
                            <Controller
                                control={control}
                                name="due_at"
                                defaultValue={issue?.due_at}
                                render={({
                                    field: {onChange, name, value, ref}
                                }) => (
                                    <DatePicker
                                        name={name}
                                        selected={value}
                                        onChange={onChange}
                                        error={!!errors.due_at}
                                        ref={ref}
                                    />
                                )}
                            />
                            { errors.due_at && <Label error>{errors.due_at.message}</Label> }
                        </Group.Col>
                        <Group.Col>
                            <Label>担当者</Label>
                            <UserSelect
                                {...register('user_id', {
                                   setValueAs: v => v === '' ? null : parseInt(v),
                                })}
                                selectedId={issue?.user?.id}
                                error={!!errors.user_id}
                            />
                            { errors.user_id && <Label error>{errors.user_id.message}</Label> }
                        </Group.Col>
                    </Group>

                    <Group gap="sm">
                        <Button type="submit" primary>保存</Button>
                        <Button type="button" onClick={closeModal}>キャンセル</Button>
                    </Group>
                </Stack>
            </form>
        </BaseModal>
    )
}
