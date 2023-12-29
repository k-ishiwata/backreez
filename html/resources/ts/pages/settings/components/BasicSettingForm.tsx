import React, { useEffect } from 'react'
import { Group, Stack } from '@/components/layouts'
import { Input, Label, Textarea } from '@/components/form'
import { Button } from '@/components'
import type { Project } from '@/types/Project'
import { SubmitHandler, useForm } from 'react-hook-form'
import { projectSchema, ProjectSchema } from '@/schemas/ProjectSchema'
import { zodResolver } from '@hookform/resolvers/zod'
import { useUpdateProject } from '@/queries/projectQuery'

type Props = {
    project: Project
}

export const BasicSettingForm: React.FC<Props> = ({
    project
}) => {
    const {
        register, handleSubmit, formState: { errors }, setValue, setError, clearErrors
    } = useForm<ProjectSchema>({
        resolver: zodResolver(projectSchema)
    })

    const updateProject = useUpdateProject(setError)

    useEffect(() => {
        clearErrors()
        setValue('key', project?.key || '')
        setValue('name', project?.name || '')
        setValue('description', project?.description || '')
    }, [project])

    const onSubmit: SubmitHandler<ProjectSchema> = data => {
        const newProject = {...project, ...data}
        updateProject.mutate({
            id: project.id,
            project: newProject
        })
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <Stack>
                <div>
                    <p>ID : {project.key}</p>
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
                        rows={5}
                        {...register('description')}
                    />
                    { errors.description && <Label error>{errors.description.message}</Label> }
                </div>

                <Group gap="sm">
                    <Button type="submit" primary>保存</Button>
                </Group>
            </Stack>
        </form>
    )
}
