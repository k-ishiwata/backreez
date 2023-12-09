import React from 'react'
import { Button, Badge, Priority } from '@/components'
import { Group } from '@/components/layouts'
import { format } from 'date-fns'
import { Link } from 'react-router-dom'
import { useDeleteIssue } from '@/queries/issueQuery'
import { useConfirmDialog, useInputModal } from '@/hooks/modal'
import type { Issue } from '@/types/Issue'

type Props = {
    issue: Issue
}

export const IssueListItem: React.FC<Props> = ({
    issue
}) => {
    const { openModal } = useInputModal<Issue>('issue')
    const { openDialog, closeDialog } = useConfirmDialog('delete')

    const deleteIssue = useDeleteIssue()

    const handleDelete = (id: number) => {
        deleteIssue.mutate(id, {
            onSuccess: closeDialog
        })
    }

    return (
        <tr>
            <td width={60}>
                <Link to={String(issue.id)}>
                    {String(issue.id).padStart(6, '0')}
                </Link>
            </td>
            <td>{issue.subject}</td>
            <td width={100}>
                <Badge css={{backgroundColor: issue.status.color}}>
                    {issue.status.name}
                </Badge>
            </td>
            <td width={120}>{issue.user?.name}</td>
            <td width={80}>
                <Priority selectedId={issue.priority_id} />
            </td>
            <td width={80}>{issue.due_at && format(issue.due_at, 'yyyy/MM/dd')}</td>
            <td width={80}>{format(issue.created_at, 'yyyy/MM/dd')}</td>
            <td width={130}>
                <Group gap="sm">
                    <Button
                        size="sm"
                        onClick={() => openModal(issue)}
                    >編集</Button>
                    <Button
                        color="red" size="sm"
                        onClick={() => openDialog({
                            title: 'プロジェクトの削除',
                            message: `ID:${issue.id}を本当に削除しますか?`,
                            action: () => handleDelete(issue.id)
                        })}
                    >削除</Button>
                </Group>
            </td>
        </tr>
    )
}
