import React from 'react'
import { useIssue } from '@/queries/issueQuery'
import { useParams } from 'react-router-dom'
import {
    Loader,
    Title,
    Group,
    Table,
    Badge,
    Container
} from '@mantine/core'
import dayjs from 'dayjs'
import {
    TypographyStylesProvider
} from '@mantine/core'
import { Priority } from '@/components/elements/Priority'
import useStyles from './IssueDetail.styles'

export const IssueDetail: React.FC = () => {
    const { classes } = useStyles()

    const { issueId } = useParams()

    const { isLoading, error, data: issue } = useIssue(
        Number(issueId)
    )

    if (isLoading) return <Loader />
    if (error) return <p>データの取得に失敗しました。</p>
    if (! issue) return <p>データがありません。</p>

    return (
        <Container size="xl">
            <Group style={{marginBottom: 5}}>
                <Badge variant="filled" color={issue.status.color}>
                    {issue.status.name}
                </Badge>
                <span>作成日：{dayjs(issue.created_at).format('YYYY/MM/DD')}</span>
                <span>編集日：{dayjs(issue.updated_at).format('YYYY/MM/DD')}</span>
            </Group>

            <Title order={2} style={{marginBottom: 20}}>{issue.subject}</Title>

            <div className={classes.body}>
                <TypographyStylesProvider>
                    <div dangerouslySetInnerHTML={{__html: issue.body || ''}} />
                </TypographyStylesProvider>

                <Group noWrap spacing="xl" className={classes.info}>
                    <div>
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
                    </div>
                    <div>
                        <Table>
                            <tbody>
                                <tr>
                                    <td width={140}>優先度</td>
                                    <td><Priority priority_id={issue.priority_id} /></td>
                                </tr>
                                <tr>
                                    <td>担当者</td>
                                    <td></td>
                                </tr>
                                <tr>
                                    <td>編集日</td>
                                    <td>{issue.updated_at && dayjs(issue.updated_at).format('YYYY/MM/DD HH:mm')}</td>
                                </tr>
                            </tbody>
                        </Table>
                    </div>
                </Group>
            </div>
        </Container>
    )
}
