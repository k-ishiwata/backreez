import React, { useState } from 'react'
import dayjs from 'dayjs'
import { useDeleteProject } from '@/queries/projectQuery'
import { Group } from '@/components/layouts'
import { Button } from '@/components'
import { ConfirmDialog } from '@/components/Modal'
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
    const [isEditModal, setIsEditModal] = useState(false)
    const [idDeleteDialog, isSetShowDeleteDialog] = useState(false)

    const deleteProject = useDeleteProject()

    const handleDelete = (id: number) => {
        deleteProject.mutate(id)
        isSetShowDeleteDialog(false)
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
                        onClick={() => setIsEditModal(true)}
                    >編集</Button>
                    <Button
                        size="sm"
                        color="red"
                        onClick={() => isSetShowDeleteDialog(true)}
                    >削除</Button>
                </Group>
                <ConfirmDialog
                    title="削除確認"
                    message={`#${project.key}を削除しますか`}
                    closeModal={() => isSetShowDeleteDialog(false)}
                    action={() => handleDelete(project.id)}
                    isVisible={idDeleteDialog}
                />
                <InputModal
                    editItem={project}
                    handleCloseModal={() => setIsEditModal(false)}
                    isVisible={isEditModal}
                />
            </td>
        </tr>
    )
}
