import React from 'react'
import { styled } from '@/stitches.config'

const Wrap = styled('div', {
    display: 'flex',
    alignItems: 'center',
    gap: 5,
    marginTop: 20,
    fontSize: '$sm',

    '> button': {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexWrap: 'wrap',
        width: 30,
        height: 30,
        border: 'solid 1px $border',
        transition: 'all 0.15s linear',
        borderRadius: '$sm',
        backgroundColor: '$white',
        cursor: 'pointer',

        '&:hover': {
            backgroundColor: '$grayHover',
        },
        '&.is-active': {
            color: '$white',
            backgroundColor: '$primary',
        },
        '&:disabled': {
            cursor: 'not-allowed',

            '&:hover': {
                backgroundColor: '$white',
            },
        },
    }
})

type Props = {
    page: number    // 現在のページ
    total: number   // 全ページ数
    limit?: number   // 表示数
    onClick: (page: number) => void
}

export const Pagination: React.FC<Props> = ({
    page,
    total,
    limit = 5,
    onClick,
}) => {
    // const showLimit = Math.min(total, limit)
    const showLimit = total

    return (
        <Wrap>
            <button disabled={page === 1} onClick={() => onClick(page-1)}>&lt;</button>
            {
                [...Array(showLimit)].map((_, i) =>
                    <button
                        key={i+1}
                        className={i+1 === page ? 'is-active' : ''}
                        onClick={() => onClick(i+1)}
                    >{i+1}</button>
                )
            }
            <button disabled={page === showLimit} onClick={() => onClick(page+1)}>&gt;</button>
        </Wrap>
    )
}
