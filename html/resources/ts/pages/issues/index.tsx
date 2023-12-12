import React from 'react'
import { Group, Container } from '@/components/layouts'
import { Button } from '@/components'
import { IssueList } from './components/IssueList'
import { InputModal } from './components/InputModal'
import { useParams } from 'react-router-dom'
import { useInputModal } from '@/hooks/modal'

const IssuesPage: React.FC = () => {
    const { openModal } = useInputModal('issue')

    // URLからプロジェクトキーを取得
    const { projectKey } = useParams()

    return (
        <Container size="full">
            <Group justify="between" css={{marginBottom: 10}}>
                <h1>課題一覧</h1>
                <Button primary onClick={() => openModal(undefined)}>新規作成</Button>
            </Group>
            <IssueList />
            <InputModal projectKey={projectKey} isListMode={true} isScroll={false} />
        </Container>
    )
}

export default IssuesPage
