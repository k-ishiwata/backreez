import React, { ReactNode } from 'react'
import { NavLink } from 'react-router-dom'
import { styled } from '@/stitches.config'

const Wrap = styled('li', {
    padding: '7px 10px',
    lineHeight: 1,

    '> a': {
        color: '$font',
        textDecoration: 'none',
        display: 'flex',
        alignItems: 'center',

        '&:hover': {
            color: '$primary',
            fontWeight: 'bold',

            '.icon': {
                color: '$primary',
            }
        },

        '&.active': {
            color: '$primary',
            fontWeight: 'bold',

            '.icon': {
                color: '$primary',
            }
        }
    },

    '.icon': {
        color: '$gray',
        marginRight: 6,
        fontSize: 16,
    }
})

type Props = {
    to: string
    icon?: ReactNode
    children: ReactNode
}

export const NavItem: React.FC<Props> = ({
    to,
    icon,
    children
}) => {
    return (
        <Wrap>
            <NavLink to={to}>
                { icon ? <i className="icon">{icon}</i> : '' }
                {children}
            </NavLink>
        </Wrap>
    )
}
