import React, { ReactNode } from 'react'
import { NavLink } from 'react-router-dom'

type Props = {
    to: string
    icon: ReactNode
    children: ReactNode
}

export const NavItem: React.FC<Props> = ({
    to,
    icon,
    children
}) => {
    return (
        <li>
            <NavLink to={to}>
                <i className="icon">{icon}</i>
                {children}
            </NavLink>
        </li>
    )
}
