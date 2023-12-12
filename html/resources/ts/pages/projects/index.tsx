import React from 'react'
import { InputModal } from './components/InputModal'
import { ProjectList } from './components/ProjectList'
import { Group, Container } from '@/components/layouts'
import { Button } from '@/components/Button'
import { useInputModal } from '@/hooks/modal'

const ProjectPage: React.FC = () => {
    const { openModal } = useInputModal('project')

    return (
        <Container>
            <Group justify="between" css={{marginBottom: 10}}>
                <h1>プロジェクト一覧</h1>
                <Button primary onClick={() => openModal(undefined)}>新規作成</Button>
            </Group>
            <ProjectList />
            <InputModal />
        </Container>
    )
}

export default ProjectPage
