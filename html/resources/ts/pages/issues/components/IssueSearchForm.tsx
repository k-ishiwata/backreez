import React from 'react'
import { Group } from '@/components/layouts'
import { Button, prioritySelect } from '@/components'
import {
    Input,
    Label,
    Select,
    UserSelect,
    DatePicker,
} from '@/components/form'
import { useForm, SubmitHandler, Controller } from 'react-hook-form'
import { format } from 'date-fns'

type IssueSearch = {
    id?: number|null
    subject?: string|null
    status_id?: number|null
    user_id?: number|null
    priority_id?: number|null
    due_at?: Date|null
}

type Props = {
    searchParam: object
    setSearchParam:  React.Dispatch<React.SetStateAction<any>>
}

export const IssueSearchForm: React.FC<Props> = ({
    searchParam,
    setSearchParam
}) => {
    const { register, handleSubmit, control } = useForm<IssueSearch>()

    const onSubmit: SubmitHandler<IssueSearch> = data => {
        (Object.keys(data) as (keyof IssueSearch)[]).forEach(key => {
            if (data[key] === '' || Number.isNaN(data[key])) {
                data[key] = null
            }
        })

        setSearchParam({
            ...searchParam,
            ...data,
            'due_at': data.due_at && format(data.due_at, 'yyyy-MM-dd')
        })
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <Group gap="sm" css={{marginBottom: 20, alignItems: 'end'}}>
                <div>
                    <Label size="sm">ID</Label>
                    <Input
                        type="text"
                        {...register('id')}
                        css={{width: 100}}
                        size="sm"
                    />
                </div>
                <div>
                    <Label size="sm">件名</Label>
                    <Input
                        type="text"
                        {...register('subject')}
                        size="sm"
                    />
                </div>
                <div>
                    <Label size="sm">状態</Label>
                    <Select
                        {...register('status_id', { valueAsNumber: true })}
                        data={[
                            { value: '1', label: '未対応' },
                            { value: '2', label: '進行中' },
                            { value: '3', label: '処理済み' },
                            { value: '4', label: '完了' },
                        ]}
                        size="sm"
                    />
                </div>
                <div>
                    <Label size="sm">担当者</Label>
                    <UserSelect
                        {...register('user_id', {
                            setValueAs: v => v === '' ? null : parseInt(v),
                        })}
                        size="sm"
                    />
                </div>
                <div>
                    <Label size="sm">優先度</Label>
                    <Select
                        {...register('priority_id', {
                            setValueAs: v => v === '' ? null : parseInt(v),
                        })}
                        data={prioritySelect}
                        size="sm"
                    />
                </div>
                <div>
                    <Label size="sm">期限</Label>
                    <Controller
                        control={control}
                        name="due_at"
                        render={({
                            field: {onChange, name, value, ref}
                        }) => (
                            <DatePicker
                                name={name}
                                selected={value}
                                onChange={onChange}
                                dateFormat="yyyy-MM-dd"
                                ref={ref}
                                size="sm"
                            />
                        )}
                    />
                </div>
                <Button size="sm">検索</Button>
            </Group>
        </form>
    )
}
