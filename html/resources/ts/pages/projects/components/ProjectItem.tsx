import React from 'react'
import dayjs from 'dayjs'
import { Link } from 'react-router-dom'
import { useDeleteProject } from '@/queries/projectQuery'
import {
    Card,
    Text,
    Title,
    Group,
    Stack,
    Button
} from '@mantine/core'
import { useConfirmModal, useContentModal } from '@/hooks/modals'
import { InputModal } from './InputModal'
import type { Project } from '@/types/Project'

type Props = {
    project: Project
}

// プロジェクト各リンク一覧
const projectLinks = [
    { link: 'home',     label: 'ホーム' },
    { link: 'issues',   label: '課題' },
    { link: 'settings', label: '設定' }
]

export const ProjectItem: React.FC<Props> = ({
    project
}) => {
    const deleteProject = useDeleteProject()

    // 削除確認モーダル
    const { deleteModal } = useConfirmModal<Project>(deleteProject)
    const { openModal } = useContentModal()

    return (
        <Card shadow="md" p="lg">
            <Group position="apart" align="top">
                <div>
                    <Title order={4} style={{marginBottom: 3}}>
                        {project.name}
                    </Title>
                    <Group style={{marginBottom: 6}}>
                        <Text size="sm">
                            作成日 : {dayjs(project.updated_at).format('YYYY/MM/DD')}
                        </Text>
                        <Text size="sm">
                            更新日 : {dayjs(project.created_at).format('YYYY/MM/DD')}
                        </Text>
                    </Group>
                    <Group spacing="xs">
                        {projectLinks.map((item, index) => (
                            <Button
                                key={index}
                                variant="light"
                                size="xs"
                                compact
                                component={Link}
                                to={`/projects/${project.key}/${item.link}`}
                            >
                                {item.label}
                            </Button>
                        ))}
                    </Group>
                </div>
                <Stack spacing="xs">
                    <Button variant="outline" size="xs" component="a"
                        onClick={() => openModal({
                            title: '編集',
                            children: <InputModal editItem={project} />
                        })}>編集</Button>
                    <Button
                        color="red" size="xs"
                        onClick={() => deleteModal(project)}
                    >削除</Button>
                </Stack>
            </Group>
        </Card>
    )
}
