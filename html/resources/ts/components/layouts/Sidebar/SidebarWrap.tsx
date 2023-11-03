import React, { ReactNode } from 'react'
import { styled } from '@/stitches.config'

const Wrap = styled('div', {
    position: 'fixed',
    left: 0,
    top: 0,
    bottom: 0,
    width: 200,
    borderRight: 'solid 1px $border',
    paddingTop: 50,
})

const Navbar = styled('ul', {
    listStyle: 'none',
    margin: 0,
    padding: '10px 0',
})

type Props = {
    children?: ReactNode
}

export const SidebarWrap: React.FC<Props> = ({
    children
}) => {
    return (
        <Wrap>
            <Navbar>
                {children}
            </Navbar>
        </Wrap>
    )
}
