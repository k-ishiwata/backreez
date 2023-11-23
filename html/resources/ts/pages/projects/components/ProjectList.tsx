import React, { useState } from 'react'
import { useProjects } from '@/queries/projectQuery'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { Loader, Table, Pagination } from '@/components'
import { ProjectItem } from './ProjectItem'

export const ProjectList: React.FC = () => {
    const navigate = useNavigate()
    // pageパラメータ取得
    const [ params ] = useSearchParams()
    const pageParam = params.get('page') || 1

    // 現在のページ
    const [page, setPage] = useState<number>(Number(pageParam))

    const { isLoading, error, data: projectPager } = useProjects(Number(pageParam))

    if (isLoading) return <Loader />
    if (error) return <p>データの取得に失敗しました。</p>
    if (! projectPager?.data?.length) return <p>データがありません。</p>

    const { data: projects, last_page: lastPage } = projectPager

    const handlePagerClick = (page: number) => {
        setPage(page)
        // アドレスURLの書き換え
        navigate('?page=' + page)
    }

    return (
        <div>
            <Table>
                <thead>
                    <tr>
                        <th style={{width: 110}}>ID</th>
                        <th>プロジェクト名</th>
                        <th>登録日</th>
                        <th>編集日</th>
                        <th>アクション</th>
                    </tr>
                </thead>
                <tbody>
                    {projects.map((project, index) => (
                        <ProjectItem
                            key={index}
                            project={project}
                        />
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
