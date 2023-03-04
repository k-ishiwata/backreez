import React from 'react'
import { useIssue } from '@/queries/issueQuery'
import { useParams } from 'react-router-dom'
import {
    Loader,
    Title,
    Group,
    Table,
    Badge,
    Container,
    Button,
    Grid
} from '@mantine/core'
import dayjs from 'dayjs'
import {
    TypographyStylesProvider
} from '@mantine/core'
import { Priority } from '@/components/elements/Priority'
import useStyles from './IssueDetail.styles'
import { InputModal } from "./InputModal"
import { useContentModal } from '@/hooks/modals'

export const IssueDetail: React.FC = () => {
    const { classes } = useStyles()

    const { issueId } = useParams()

    const { openModal } = useContentModal()

    const { isLoading, error, data: issue } = useIssue(
        Number(issueId)
    )

    if (isLoading) return <Loader />
    if (error) return <p>データの取得に失敗しました。</p>
    if (! issue) return <p>データがありません。</p>

    return (
        <Container size="xl">
            <Grid align="baseline" style={{marginBottom: 3}}>
                <Grid.Col span={6}>
                    <Group>
                        <Badge variant="filled" color={issue.status.color}>
                            {issue.status.name}
                        </Badge>
                        <span>作成日：{dayjs(issue.created_at).format('YYYY/MM/DD')}</span>
                        <span>編集日：{dayjs(issue.updated_at).format('YYYY/MM/DD')}</span>
                    </Group>
                </Grid.Col>
                <Grid.Col span={6}>
                    <Group position="right" spacing="xs">
                        <Button component="a"
                            onClick={() => openModal({
                                title: '編集',
                                children: <InputModal editItem={issue} />,
                                size: '70%'
                            })}>編集</Button>
                    </Group>
                </Grid.Col>
            </Grid>

            <Title order={2} style={{marginBottom: 20}}>{issue.subject}</Title>

            <div className={classes.body}>
                <TypographyStylesProvider>
                    {issue.body}
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
                    </div>
                </Group>
            </div>
        </Container>
    )
}
