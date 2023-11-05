import React, { useEffect } from 'react'
import { Button } from '@/components'
import { Input, Label, Textarea } from '@/components/form'
import { Group, Stack } from '@/components/layouts'
import { closeAllModals } from '@mantine/modals'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm, SubmitHandler } from 'react-hook-form'
import {
    useCreateProject,
    useUpdateProject
} from '@/queries/projectQuery'
import { projectSchema } from '@/validations/ProjectSchema'
import type { Project } from 'types/Project'
import type { ProjectSchema } from '@/validations/ProjectSchema'

type Props = {
    editItem?: Project | null
}

export const InputModal: React.FC<Props> = ({
    editItem
}) => {
    const {
        register, handleSubmit, formState: { errors }, setValue, setError
    } = useForm<ProjectSchema>({
        resolver: zodResolver(projectSchema)
    })

    const updateProject = useUpdateProject(setError)
    const createProject = useCreateProject(setError)

    useEffect(() => {
        setValue('key', editItem?.key || '')
        setValue('name', editItem?.name || '')
        setValue('description', editItem?.description || '')
    }, [])

    const onSubmit: SubmitHandler<ProjectSchema> = data => {
        // editItemがある場合は更新
        if (editItem) {
            const newProject = {...editItem, ...data}
            updateProject.mutate({
                id: editItem.id,
                project: newProject
            })
        } else {
            createProject.mutate(data)
        }
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <Stack>
                <div>
                    <Label required>プロジェクトID</Label>
                    <Input
                        type="text"
                        {...register('key')}
                        placeholder="ABCD"
                        error={!!errors.key}
                        required
                    />
                    { errors.key && <Label error>{errors.key.message}</Label> }
                </div>

                <div>
                    <Label required>プロジェクト名</Label>
                    <Input
                        type="text"
                        {...register('name')}
                        placeholder="プロジェクトA"
                        error={!!errors.name}
                        required
                    />
                    { errors.name && <Label error>{errors.name.message}</Label> }
                </div>

                <div>
                    <Label>概要</Label>
                    <Textarea
                        rows={3}
                        {...register('description')}
                    />
                    { errors.description && <Label error>{errors.description.message}</Label> }
                </div>

                <Group gap="sm">
                    <Button type="submit" primary>保存</Button>
                    <Button type="button" onClick={() => closeAllModals()}>キャンセル</Button>
                </Group>
            </Stack>

        </form>
    )
}
