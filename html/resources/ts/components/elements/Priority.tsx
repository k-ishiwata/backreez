import React from 'react'

export const priorities = [
    '',
    '低',
    '中',
    '高',
]

// セレクトボックス用
export const prioritySelect = priorities.map((item, key) => {
    return {
        value: String(key),
        label: item,
    }
}).filter(i => i?.label !== '')

const heightPriority = 3

type Props = {
    selectedId?: number
}

export const Priority: React.FC<Props> = ({
    selectedId
}) => {
    if (! selectedId) {
        return null
    }

    let style = {}

    // 優先度高はスタイル変える
    if (selectedId === heightPriority) {
        style = {
            color: 'red',
            fontWeight: 'bold'
        }
    }

    return (
        <span style={style}>
            {/*{priorities.find(item => item.value === selectedId)?.label}*/}
            {priorities[selectedId]}
        </span>
    )
}
