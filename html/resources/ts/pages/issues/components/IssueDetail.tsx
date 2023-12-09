import React from 'react'
import { useIssue } from '@/queries/issueQuery'
import { useParams } from 'react-router-dom'
import {
    Article,
    Loader,
    Button,
    Badge,
    Table,
    Priority
} from '@/components'
import { Group, Container } from '@/components/layouts'
import dayjs from 'dayjs'
import { useInputModal } from "@/hooks/modal"
import { Issue } from "@/types/Issue"

export const IssueDetail: React.FC = () => {

    const { issueId } = useParams()

    const { openModal } = useInputModal<Issue>('issue')

    const { isLoading, error, data: issue } = useIssue(
        Number(issueId)
    )

    if (isLoading) return <Loader />
    if (error) return <p>データの取得に失敗しました。</p>
    if (! issue) return <p>データがありません。</p>

    return (
        <Container>
            <Group between css={{marginBottom: 10}}>
                <Group>
                    <Badge css={{backgroundColor: issue.status.color, width: 100}}>
                        {issue.status.name}
                    </Badge>
                    <span>作成日：{dayjs(issue.created_at).format('YYYY/MM/DD')}</span>
                    <span>編集日：{dayjs(issue.updated_at).format('YYYY/MM/DD')}</span>
                </Group>
                <Button
                    primary
                    onClick={() => openModal(issue)}
                >編集</Button>
            </Group>

            <h1 style={{marginBottom: 20}}>{issue.subject}</h1>

            <Article>
                {issue.body}
            </Article>

            <Group css={{width: '100%'}}>
                <Table>
                    <tbody>
                        <tr>
                            <td width={140}>期限</td>
                            <td>{issue.due_at && dayjs(issue.due_at).format('YYYY/MM/DD HH:mm')}</td>
                        </tr>
                        <tr>
                            <td>ステータス</td>
                            <td>{issue.status.name}</td>
                        </tr>
                        <tr>
                            <td>登録日</td>
                            <td>{issue.created_at && dayjs(issue.created_at).format('YYYY/MM/DD HH:mm')}</td>
                        </tr>
                    </tbody>
                </Table>
                <Table>
                    <tbody>
                        <tr>
                            <td width={140}>優先度</td>
                            <td><Priority selectedId={issue.priority_id} /></td>
                        </tr>
                        <tr>
                            <td>担当者</td>
                            <td>{issue.user?.name}</td>
                        </tr>
                        <tr>
                            <td>編集日</td>
                            <td>{issue.updated_at && dayjs(issue.updated_at).format('YYYY/MM/DD HH:mm')}</td>
                        </tr>
                    </tbody>
                </Table>
            </Group>
        </Container>
    )
}
