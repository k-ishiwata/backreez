import React, { useState } from 'react'
import { useIssues } from '@/queries/issueQuery'
import { useNavigate, useSearchParams } from 'react-router-dom'
import {
    Loader,
    Table,
    Pagination
} from '@/components'
import { IssueListItem } from './IssueListItem'

type Props = {
    searchParam: object
}

export const IssueList: React.FC<Props> = ({
    searchParam
}) => {
    const navigate = useNavigate()
    // pageパラメータ取得
    const [ params ] = useSearchParams()
    const pageParam = params.get('page') || 1

    // 現在のページ
    const [page, setPage] = useState<number>(Number(pageParam))

    const { isLoading, error, data: issuePager } = useIssues(searchParam, Number(pageParam))

    if (isLoading) return <Loader />
    if (error) return <p>データの取得に失敗しました。</p>
    if (! issuePager?.data?.length) return <p>データがありません。</p>

    const { data: issues, last_page: lastPage } = issuePager

    const handlePagerClick = (page: number) => {
        setPage(page)
        // アドレスURLの書き換え
        navigate('?page=' + page)
    }

    return (
        <div>
            <Table stripe>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>件名</th>
                        <th>状態</th>
                        <th>担当者</th>
                        <th>優先度</th>
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
                lastPage !== 1 &&
                    <Pagination
                        page={page}
                        total={lastPage}
                        onClick={handlePagerClick}
                    />
            }
        </div>
    )
}
