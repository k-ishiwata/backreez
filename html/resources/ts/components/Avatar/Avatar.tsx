import { styled } from '@/stitches.config'
import React, { ReactNode } from 'react'

const Wrap = styled('div', {
    width: 36,
    height: 36,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    overflow: 'hidden',
    borderRadius: '50%',
    background: '$gray',
    color: '$white',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    userSelect: 'none',
    cursor: 'pointer',
})

type Props = {
    src?: string
    children?: ReactNode
}

export const Avatar: React.FC<Props> = ({
    src,
    children
}) => {
    return (
        <Wrap css={{backgroundImage: `url(${ src })`}}>
            { src ? '' : children }
        </Wrap>
    )
}
