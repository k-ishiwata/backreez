import React, { useEffect } from 'react'
import {
    Group,
    Stack,
    Button,
    Textarea,
    TextInput
} from '@mantine/core'
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
                <TextInput
                    required
                    label="プロジェクトID"
                    placeholder="ABCD"
                    error={errors.key?.message}
                    {...register('key')}
                />
                <TextInput
                    required
                    label="プロジェクト名"
                    placeholder="プロジェクトA"
                    error={errors.name?.message}
                    {...register('name')}
                />
                <Textarea
                    label="概要"
                    autosize
                    minRows={2}
                    maxRows={4}
                    error={errors.description?.message}
                    {...register('description')}
                />
            </Stack>
            <Group spacing="xs" mt="lg">
                <Button type="submit">保存</Button>
                <Button variant="outline" onClick={() => closeAllModals()}>キャンセル</Button>
            </Group>
        </form>
    )
}
