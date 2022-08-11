import React, { useState } from 'react'
import { useProjects } from '@/queries/projectQuery'
import { useNavigate, useSearchParams } from 'react-router-dom'
import {
    Loader,
    SimpleGrid,
    Pagination
} from '@mantine/core'
import { ProjectItem } from './ProjectItem'

export const ProjectList: React.FC = () => {
    const navigate = useNavigate()
    // pageパラメータ取得
    const [ params ] = useSearchParams()
    const pageParam = params.get('page')

    // 現在のページ
    const [page, setPage] = useState<number>(Number(pageParam))

    const { isLoading, error, data: projectPager } = useProjects(Number(pageParam))

    if (isLoading) return <Loader />
    if (error) return <p>データの取得に失敗しました。</p>
    if (! projectPager?.data?.length) return <p>データがありません。</p>

    const { data: projects, last_page } = projectPager

    const handlePagerClick = (page: number) => {
        setPage(page)
        // アドレスURLの書き換え
        navigate('?page=' + page)
    }

    return (
        <div>
            <SimpleGrid
                cols={2}
                spacing="md"
                breakpoints={[{
                    maxWidth: 900,
                    cols: 1
                }]}
                style={{ marginBottom: 30 }}
            >
                {projects.map((project, index) => (
                    <ProjectItem
                        key={index}
                        project={project}
                    />
                ))}
            </SimpleGrid>
            <Pagination
                page={page}
                total={last_page}
                onChange={handlePagerClick}
            />
        </div>
    )
}
