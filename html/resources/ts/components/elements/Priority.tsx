import React from 'react'

export const priorities = [
    '',
    '低',
    '中',
    '高',
]

type Props = {
    priority_id?: number
}

export const Priority: React.FC<Props> = ({
    priority_id
}) => {
    let style = {}

    if (priorities.length - 1 === priority_id) {
        style = {
            color: 'red',
            fontWeight: 'bold'
        }
    }

    return (
        <span style={style}>
            { priority_id ? (priorities[priority_id] || '') : '' }
        </span>
    )
}
