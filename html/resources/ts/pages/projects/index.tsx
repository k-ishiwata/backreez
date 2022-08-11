import React from 'react'
import { InputModal } from './components/InputModal'
import { ProjectList } from './components/ProjectList'
import {
    Group,
    Button,
    Container,
    Title,
    Space
} from '@mantine/core'
import { useContentModal } from '@/hooks/modals'

const ProjectPage: React.FC = () => {
    const { openModal } = useContentModal()

    return (
        <Container>
            <Group position="apart">
                <Title order={2}>プロジェクト一覧</Title>
                <div>
                    <Button onClick={() => openModal({
                        title: '新規作成',
                        children: <InputModal />,
                    })}>新規作成</Button>
                </div>
            </Group>
            <Space h="md" />
            <ProjectList />
        </Container>
    )
}

export default ProjectPage
