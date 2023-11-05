import React from 'react'
import { InputModal } from './components/InputModal'
import { ProjectList } from './components/ProjectList'
import { Group, Container } from '@/components/layouts'
import { Button } from '@/components/Button'
import { useContentModal } from '@/hooks/modals'

const ProjectPage: React.FC = () => {
    const { openModal } = useContentModal()

    return (
        <Container>
            <Group between>
                <h1>プロジェクト一覧</h1>
                <div>
                    <Button primary onClick={() => openModal({
                        title: '新規作成',
                        children: <InputModal />,
                    })}>新規作成</Button>
                </div>
            </Group>
            <ProjectList />
        </Container>
    )
}

export default ProjectPage
