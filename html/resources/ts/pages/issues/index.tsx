import React, { useState } from 'react'
import { Group, Container } from '@/components/layouts'
import { Button } from '@/components'
import { IssueList } from './components/IssueList'
import { InputModal } from './components/InputModal'
import { IssueSearchForm } from './components/IssueSearchForm'
import { useParams } from 'react-router-dom'
import { useInputModal } from '@/hooks/modal'

const IssuesPage: React.FC = () => {
    const { openModal } = useInputModal('issue')

    // URLからプロジェクトキーを取得
    const { projectKey } = useParams()

    // 検索用ステート
    const [ searchParam, setSearchParam ] = useState({
        'project_key': projectKey
    })

    return (
        <Container size="full">
            <Group justify="between" css={{marginBottom: 10}}>
                <h1>課題一覧</h1>
                <Button primary onClick={() => openModal(undefined)}>新規作成</Button>
            </Group>
            <IssueSearchForm searchParam={searchParam} setSearchParam={setSearchParam} />
            <IssueList searchParam={searchParam} />
            <InputModal projectKey={projectKey} isListMode={true} isScroll={false} />
        </Container>
    )
}

export default IssuesPage
