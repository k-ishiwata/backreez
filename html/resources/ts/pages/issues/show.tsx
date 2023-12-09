import React from 'react'
import { IssueDetail } from './components/IssueDetail'
import { useParams } from 'react-router-dom'
import { InputModal } from '@/pages/issues/components/InputModal'

const IssueShowPage: React.FC = () => {
    // URLからプロジェクトキーを取得
    const { projectKey } = useParams()

    return (
        <>
            <IssueDetail />
            <InputModal projectKey={projectKey} />
        </>
    )
}

export default IssueShowPage
