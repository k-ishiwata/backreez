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
import { format } from 'date-fns'
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
            <Group justify="between" css={{marginBottom: 10}}>
                <Group>
                    {issue.status &&
                        <Badge css={{backgroundColor: issue.status.color, width: 100}}>
                            {issue.status.name}
                        </Badge>
                    }
                    <span>登録日：{format(issue.created_at, 'yyyy/MM/dd HH:mm')}</span>
                    <span>更新日：{format(issue.created_at, 'yyyy/MM/dd HH:mm')}</span>
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
                            <td>{issue.due_at && format(issue.due_at, 'yyyy/MM/dd HH:mm')}</td>
                        </tr>
                        <tr>
                            <td>ステータス</td>
                            <td>{issue.status?.name}</td>
                        </tr>
                        <tr>
                            <td>登録日</td>
                            <td>{format(issue.created_at, 'yyyy/MM/dd HH:mm')}</td>
                        </tr>
                    </tbody>
                </Table>
                <Table>
                    <tbody>
                        <tr>
                            <td width={140}>優先度</td>
                            <td><Priority selectedId={issue?.priority_id} /></td>
                        </tr>
                        <tr>
                            <td>担当者</td>
                            <td>{issue.user?.name}</td>
                        </tr>
                        <tr>
                            <td>更新日</td>
                            <td>{format(issue.updated_at, 'yyyy/MM/dd HH:mm')}</td>
                        </tr>
                    </tbody>
                </Table>
            </Group>
        </Container>
    )
}
