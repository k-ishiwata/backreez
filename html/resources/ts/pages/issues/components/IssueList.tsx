import React, { useState } from 'react'
import { useIssues } from '@/queries/issueQuery'
import { useLocation, useNavigate, useSearchParams } from 'react-router-dom'
import {
    Loader,
    Table,
    Pagination
} from '@mantine/core'
import { IssueListItem } from './IssueListItem'
import useStyles from './IssueList.styles'

export const IssueList: React.FC = () => {
    const { classes } = useStyles()

    const navigate = useNavigate()
    // pageパラメータ取得
    const [ params ] = useSearchParams()
    const pageParam = params.get('page') || 1

    // URLからプロジェクトキーを取得
    const projectKey = useLocation().pathname.split('/')[1]

    // 現在のページ
    const [page, setPage] = useState<number>(Number(pageParam))

    const { isLoading, error, data: issuePager } = useIssues({
        'project_key': projectKey
    }, Number(pageParam))

    if (isLoading) return <Loader />
    if (error) return <p>データの取得に失敗しました。</p>
    if (! issuePager?.data?.length) return <p>データがありません。</p>

    const { data: issues, last_page } = issuePager

    const handlePagerClick = (page: number) => {
        setPage(page)
        // アドレスURLの書き換え
        navigate('?page=' + page)
    }

    return (
        <div>
            <Table
                striped highlightOnHover
                className={classes.wrapper}
            >
                <thead>
                <tr>
                    <th>ID</th>
                    <th>件名</th>
                    <th>状態</th>
                    <th>担当者</th>
                    <th>期限</th>
                    <th>登録日</th>
                    <th>アクション</th>
                </tr>
                </thead>
                <tbody>
                {issues.map((issue, index) => (
                    <IssueListItem key={index} issue={issue} />
                ))}
                </tbody>
            </Table>
            {
                last_page !== 1 &&
                    <Pagination
                        page={page}
                        total={last_page}
                        onChange={handlePagerClick}
                    />
            }
        </div>
    )
}
