import React from 'react'
import dayjs from 'dayjs'
import { useDeleteProject } from '@/queries/projectQuery'
import { Group } from '@/components/layouts'
import { Button } from '@/components'
import { useConfirmModal, useContentModal } from '@/hooks/modals'
import { InputModal } from './InputModal'
import { NavLink } from 'react-router-dom'
import type { Project } from '@/types/Project'

type Props = {
    project: Project
}

// プロジェクト各リンク一覧
const projectLinks = [
    { link: 'home',     label: 'ホーム' },
    { link: 'issues',   label: '課題' },
    { link: 'settings', label: '設定' }
]

export const ProjectItem: React.FC<Props> = ({
    project
}) => {
    const deleteProject = useDeleteProject()

    // 削除確認モーダル
    const { deleteModal } = useConfirmModal<Project>(deleteProject)
    const { openModal } = useContentModal()

    return (
        <tr>
            <td><NavLink to={`/${project.key}/home`}>{project.key}</NavLink></td>
            <td>
                <p>{project.name}</p>
                <Group gap="sm">
                {projectLinks.map((item, index) => (
                    <NavLink
                        key={index}
                        to={`/${project.key}/${item.link}`}
                    >
                        {item.label}
                    </NavLink>
                ))}
                </Group>
            </td>
            <td>{dayjs(project.updated_at).format('YYYY/MM/DD')}</td>
            <td>{dayjs(project.created_at).format('YYYY/MM/DD')}</td>
            <td width={130}>
                <Group gap="sm">
                    <Button
                        size="sm"
                        onClick={() => openModal({
                            title: '編集',
                            children: <InputModal editItem={project} />
                        })}>編集</Button>
                    <Button
                        size="sm"
                        color="red"
                        onClick={() => deleteModal(project)}
                    >削除</Button>
                </Group>
            </td>
        </tr>
    )
}
