import React from 'react'
import {
    Group, Button, Anchor, Badge
} from '@mantine/core'
import dayjs from 'dayjs'
import 'dayjs/locale/ja'
import { Link } from 'react-router-dom'
import type { Issue } from '@/types/Issue'

type Props = {
    issue: Issue
}

export const IssueListItem: React.FC<Props> = ({
    issue
}) => {
    return (
        <tr>
            <td width={60}>
                <Anchor component={Link} to={String(issue.id)}>
                    {String(issue.id).padStart(6, '0')}
                </Anchor>
            </td>
            <td>{issue.subject}</td>
            <td width={80}>
                <Badge fullWidth variant="filled" color={issue.status.color}>
                    {issue.status.name}
                </Badge>
                {/*<Badge fullWidth variant="filled" color={statuses[issue.status].color}>*/}
                {/*    {statuses[issue.status].label}*/}
                {/*</Badge>*/}
            </td>
            <td width={120}>{issue.user}</td>
            <td width={80}>{issue.due_at && dayjs(issue.due_at).format('YYYY/MM/DD')}</td>
            <td width={80}>{dayjs(issue.created_at).format('YYYY/MM/DD')}</td>
            <td width={140}>
                <Group spacing="xs">
                    {/*<Button variant="outline" size="xs" component="a" onClick={() => handleEditModal(issue)}>編集</Button>*/}
                    <Button color="red" size="xs">削除</Button>
                </Group>
            </td>
        </tr>
    )
}
