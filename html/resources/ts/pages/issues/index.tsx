import React from 'react'
import {
    Button,
    Title,
    Group
} from '@mantine/core'
import { IssueList } from './components/IssueList'
import { InputModal } from '@/pages/issues/components/InputModal'
import { useContentModal } from '@/hooks/modals'

const IssuesPage: React.FC = () => {
    const { openModal } = useContentModal()

    return (
        <>
            <Group position="apart">
                <Title order={2} style={{marginBottom: 20}}>課題一覧</Title>
                <div>
                    <Button onClick={() => openModal({
                        title: '新規作成',
                        children: <InputModal />,
                        size: '70%'
                    })}>新規作成</Button>
                </div>
            </Group>
            <IssueList />
        </>
    )
}

export default IssuesPage
