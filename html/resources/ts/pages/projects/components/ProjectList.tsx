import React, { useState } from 'react'
import dayjs from 'dayjs'
import { Link } from 'react-router-dom'
import { useProjects } from '@/queries/projects'
import { useNavigate, useSearchParams } from 'react-router-dom'
import {
    Card,
    Text,
    Title,
    Group,
    Button,
    Loader,
    SimpleGrid,
    Pagination
} from '@mantine/core'
import type { Project } from '@/types/Project'

type Props = {
    handleEditModal: (project: Project) => void
}

export const ProjectList: React.FC<Props> = ({
    handleEditModal
}) => {
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

    // プロジェクト各リンク一覧
    const projectLinks = [
        { link: 'home',     label: 'ホーム' },
        { link: 'issues',   label: '課題' },
        { link: 'settings', label: '設定' }
    ]

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
                    <Card key={index} shadow="md" p="lg">
                        <Group position="apart" align="top">
                            <div>
                                <Title order={4} style={{marginBottom: 3}}>
                                    {project.name}
                                </Title>
                                <Group style={{marginBottom: 6}}>
                                    <Text size="sm">
                                        作成日 : {dayjs(project.updated_at).format('YYYY/MM/DD')}
                                    </Text>
                                    <Text size="sm">
                                        更新日 : {dayjs(project.created_at).format('YYYY/MM/DD')}
                                    </Text>
                                </Group>
                                <Group spacing="xs">
                                    {projectLinks.map((item, index) => (
                                        <Button
                                            key={index}
                                            variant="light"
                                            size="xs"
                                            compact
                                            component={Link}
                                            to={`/projects/${project.key}/${item.link}`}
                                        >
                                            {item.label}
                                        </Button>
                                    ))}
                                </Group>
                            </div>
                            <Group spacing="xs" position="right" direction="column">
                                <Button variant="outline" size="xs" component="a"
                                        onClick={() => handleEditModal(project)}>編集</Button>
                                <Button color="red" size="xs">削除</Button>
                            </Group>
                        </Group>
                    </Card>
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
