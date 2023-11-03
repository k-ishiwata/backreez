import React from 'react'
import { styled } from '@/stitches.config'
import { useVisible } from './DropdownMenu'

type DropdownContentProps = {
    children: React.ReactNode
    position?: 'left'|'right'
}

const DropdownContentStyle = styled('div', {
    position: 'absolute',
    width: 160,
    background: '$bg',
    border: 'solid 1px $border',
    borderRadius: '$md',
    padding: 3,
    variants: {
        position: {
            left: {
                right: 0,
            },
            right: {
                left: 0,
            }
        },
    },
})

export const DropdownContent: React.FC<DropdownContentProps> = ({
    children,
    position = 'right',
}) => {
    const isVisible = useVisible()
    return (
        isVisible
            ? <DropdownContentStyle position={position}>{children}</DropdownContentStyle>
            : null
    )
}
