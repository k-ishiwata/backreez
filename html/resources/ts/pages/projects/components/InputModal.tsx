import React, { useEffect } from 'react'
import Modal from '@/components/Modal'
import {
    Group,
    Title,
    Button,
    Textarea,
    TextInput
} from '@mantine/core'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm, SubmitHandler } from 'react-hook-form'
import { projectSchema } from '@/validations/ProjectSchema'
import type { Project } from 'types/Project'
import type { ProjectSchema } from '@/validations/ProjectSchema'

type Props = {
    editItem: Project | null
    isModalOpened: boolean
    setIsModalOpened: (value: React.SetStateAction<boolean>) => void
}

export const InputModal: React.FC<Props> = ({
    editItem,
    isModalOpened,
    setIsModalOpened
}) => {
    const {
        register, handleSubmit, formState: { errors }, setValue, reset
    } = useForm<ProjectSchema>({
        resolver: zodResolver(projectSchema)
    })

    useEffect(() => {
        if (isModalOpened) {
            setValue('key', editItem?.key || '')
            setValue('name', editItem?.name || '')
            setValue('description', editItem?.description || '')
        } else {
            reset()
        }
    }, [isModalOpened])

    const onSubmit: SubmitHandler<ProjectSchema> = data => {
        console.log(data)
    }

    return (
        <Modal
            opened={isModalOpened}
            onClose={() => setIsModalOpened(false)}
            size="lg"
            title={<Title order={3}>{editItem ? '編集' : '新規作成'}</Title>}
            padding="xl"
        >
            <form onSubmit={handleSubmit(onSubmit)}>
                <Group direction="column" grow>
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
                </Group>
                <Group spacing="xs" mt="lg">
                    <Button type="submit">保存</Button>
                    <Button variant="outline" onClick={() => setIsModalOpened(false)}>キャンセル</Button>
                </Group>
            </form>
        </Modal>
    )
}
