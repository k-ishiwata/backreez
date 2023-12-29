import React from 'react'
import { BasicSettingForm } from './components/BasicSettingForm'
import { useParams } from 'react-router-dom'
import { useProject } from '@/queries/projectQuery'
import { Loader } from '@/components'
import { Container } from '@/components/layouts'

const SettingsPage: React.FC = () => {
    // URLからプロジェクトキーを取得
    const { projectKey } = useParams()

    if (! projectKey) {
        return <p>キーがありません。</p>
    }

    const { isLoading, error, data: project } = useProject(projectKey)

    if (isLoading) return <Loader />
    if (error) return <p>データの取得に失敗しました。</p>
    if (! project) return <p>データがありません。</p>

    return (
        <Container position="left">
            <h1>基本設定</h1>
            <BasicSettingForm project={project} />
        </Container>
    )
}

export default SettingsPage
