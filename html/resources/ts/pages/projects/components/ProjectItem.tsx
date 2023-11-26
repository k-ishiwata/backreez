import React from 'react'
import dayjs from 'dayjs'
import { useDeleteProject } from '@/queries/projectQuery'
import { useConfirmDialog, useInputModal } from '@/hooks/modal'
import { Group } from '@/components/layouts'
import { Button } from '@/components'
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
    const { openModal } = useInputModal<Project>('project')
    const { openDialog, closeDialog } = useConfirmDialog('delete')

    const deleteProject = useDeleteProject()

    const handleDelete = (id: number) => {
        deleteProject.mutate(id, {
            onSuccess: closeDialog
        })
    }

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
                        onClick={() => openModal(project)}
                    >編集</Button>
                    <Button
                        size="sm"
                        color="red"
                        onClick={() => openDialog({
                            title: 'Todoの削除',
                            message: `ID:${project.key}を本当に削除しますか?`,
                            action: () => handleDelete(project.id)
                        })}
                    >削除</Button>
                </Group>
            </td>
        </tr>
    )
}
