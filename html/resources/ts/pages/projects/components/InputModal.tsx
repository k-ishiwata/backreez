import React, { useEffect } from 'react'
import { Button } from '@/components'
import { Input, Label, Textarea } from '@/components/form'
import { Group, Stack } from '@/components/layouts'
import { BaseModal } from '@/components/Modal'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm, SubmitHandler } from 'react-hook-form'
import {
    useCreateProject,
    useUpdateProject
} from '@/queries/projectQuery'
import { projectSchema } from '@/validations/ProjectSchema'
import type { Project } from 'types/Project'
import type { ProjectSchema } from '@/validations/ProjectSchema'
import { useInputModal } from '@/hooks/modal'

export const InputModal: React.FC = () => {
    const {
        item: project,
        isVisible,
        closeModal
    } = useInputModal<Project|undefined>('project')

    const {
        register, handleSubmit, formState: { errors }, setValue, setError
    } = useForm<ProjectSchema>({
        resolver: zodResolver(projectSchema)
    })

    const updateProject = useUpdateProject(setError)
    const createProject = useCreateProject(setError)

    useEffect(() => {
        setValue('key', project?.key || '')
        setValue('name', project?.name || '')
        setValue('description', project?.description || '')
    }, [project])

    const onSubmit: SubmitHandler<ProjectSchema> = data => {
        // projectがある場合は更新
        if (project) {
            const newProject = {...project, ...data}
            updateProject.mutate({
                id: project.id,
                project: newProject
            }, {
                onSuccess: closeModal
            })
        } else {
            createProject.mutate(data, {
                onSuccess: closeModal
            })
        }
    }

    return (
        <BaseModal
            title={`プロジェクト${project ? '編集' : '登録'}`}
            handleCloseModal={closeModal}
            isVisible={isVisible}
        >
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
                            rows={5}
                            {...register('description')}
                        />
                        { errors.description && <Label error>{errors.description.message}</Label> }
                    </div>

                    <Group gap="sm">
                        <Button type="submit" primary>保存</Button>
                        <Button type="button" onClick={closeModal}>キャンセル</Button>
                    </Group>
                </Stack>
            </form>
        </BaseModal>
    )
}
