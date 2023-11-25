import React, { useState } from 'react'
import { InputModal } from './components/InputModal'
import { ProjectList } from './components/ProjectList'
import { Group, Container } from '@/components/layouts'
import { Button } from '@/components/Button'

const ProjectPage: React.FC = () => {
    const [isInputModal, setIsInputModal] = useState(false)

    return (
        <Container>
            <Group between css={{marginBottom: 10}}>
                <h1>プロジェクト一覧</h1>
                <Button primary onClick={() => setIsInputModal(true)}>新規作成</Button>
            </Group>
            <ProjectList />
            <InputModal
                editItem={undefined}
                handleCloseModal={() => setIsInputModal(false)}
                isVisible={isInputModal}
            />
        </Container>
    )
}

export default ProjectPage
