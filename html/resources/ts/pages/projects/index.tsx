import React, {useState} from 'react'
import { InputModal } from './components/InputModal'
import { ProjectList } from './components/ProjectList'
import {
    Group,
    Button,
    Container,
    Title,
    Space
} from '@mantine/core'
import type { Project } from '@/types/Project'

const ProjectPage: React.FC = () => {
    // モーダル表示フラグ
    const [isModalOpened, setIsModalOpened] = useState(false)
    // モーダルで編集中のアイテム
    const [editItem, setEditItem] = useState<Project|null>(null)

    // 編集登録モーダル
    const handleEditModal = (project: Project) => {
        setEditItem(project)
        setIsModalOpened(true)
    }

    // 新規登録モーダル
    const handleCreateModal = () => {
        setEditItem(null)
        setIsModalOpened(true)
    }

    return (
        <Container>
            <InputModal
                editItem={editItem}
                isModalOpened={isModalOpened}
                setIsModalOpened={setIsModalOpened}
            />
            <Group position="apart">
                <Title order={2}>プロジェクト一覧</Title>
                <div>
                    <Button onClick={handleCreateModal}>新規作成</Button>
                </div>
            </Group>
            <Space h="md" />
            <ProjectList
                handleEditModal={handleEditModal}
            />
        </Container>
    )
}

export default ProjectPage
