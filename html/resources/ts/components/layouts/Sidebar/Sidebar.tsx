import { ReactNode } from 'react'
import { Navbar, ScrollArea } from '@mantine/core'
import useStyles from './Sidebar.styles'

type Props = {
    children?: ReactNode
}

export const Sidebar: React.FC<Props> = ({
    children
}) => {
    const { classes } = useStyles()

    return (
        <Navbar
            width={{ sm: 230 }}
            fixed
        >
            <Navbar.Section
                grow
                component={ScrollArea}
            >
                <ul className={classes.list}>
                    {children}
                </ul>
            </Navbar.Section>
        </Navbar>
    )
}
