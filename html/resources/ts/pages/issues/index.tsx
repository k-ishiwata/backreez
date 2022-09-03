import React from 'react'
import {
    Title,
} from '@mantine/core'
import { IssueList } from './components/IssueList'

const IssuesPage: React.FC = () => {
    return (
        <>
            <Title order={2} style={{marginBottom: 20}}>課題一覧</Title>
            <IssueList />
        </>
    )
}

export default IssuesPage
