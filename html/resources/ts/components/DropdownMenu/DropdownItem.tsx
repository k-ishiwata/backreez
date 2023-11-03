import React from 'react'
import { styled } from '@/stitches.config'

const DropdownItemStyle = styled('button', {
    color: '$font',
    lineHeight: 1,
    textDecoration: 'none',
    display: 'flex',
    alignItems: 'center',
    padding: '9px 12px',
    cursor: 'pointer',
    border: 'none',
    background: 'none',
    width: '100%',
    textAlign: 'left',

    "&:hover": {
        background: '$grayLight',
    },
    "i": {
        display: 'block',
        marginRight: 5,
    }
})

type DropdownItemProps = React.ComponentPropsWithRef<'button'> & {
    children: React.ReactNode,
    icon?: React.ReactNode
}

export const DropdownItem = React.forwardRef<HTMLButtonElement, DropdownItemProps>((
    props,
    ref
) => {
    const {children, icon} = props
    return (
        <DropdownItemStyle {...props} ref={ref}>
            {icon ? <i>{icon}</i> : ''}
            {children}
        </DropdownItemStyle>
    )
})
