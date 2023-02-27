import React from 'react'
import {
    Menu,
    Group,
    Header as BaseHeader,
    Avatar,
    ActionIcon,
    useMantineColorScheme
} from '@mantine/core'
import {
    IoMoonOutline,
    IoSunnyOutline,
    IoLogOutOutline,
    IoSettingsOutline,
    IoChevronDownOutline
} from 'react-icons/io5'
import { NavLink } from 'react-router-dom'
import useStyles from './Header.styles'
import { useLogout } from "@/queries/authQuery"

export const Header: React.FC= () => {
    const { classes } = useStyles()
    const { colorScheme, toggleColorScheme } = useMantineColorScheme()
    const logout = useLogout()

    const handleLogout = () => logout.mutate()

    return (
        <BaseHeader
            height={50}
            p="xs"
            className={classes.wrapper}
        >
            <p className={classes.appName}>Backreez</p>
            <ul className={classes.mainNav}>
                <li className="item"><NavLink to="/">ダッシュボード</NavLink></li>
                <li className="item"><NavLink to="projects">プロジェクト</NavLink></li>
            </ul>

            <Group className={classes.subNav}>
                <ActionIcon variant="default" onClick={() => toggleColorScheme()} size={30}>
                    {colorScheme === 'dark' ? <IoSunnyOutline /> : <IoMoonOutline />}
                </ActionIcon>
                <Menu width={200}>
                    <Menu.Target>
                        <Group spacing="xs">
                            <Avatar radius="xl" />
                            <IoChevronDownOutline />
                        </Group>
                    </Menu.Target>
                    <Menu.Dropdown>
                        <Menu.Item icon={<IoSettingsOutline />}>設定</Menu.Item>
                        <Menu.Item icon={<IoLogOutOutline />} onClick={handleLogout}>ログアウト</Menu.Item>
                    </Menu.Dropdown>
                </Menu>
            </Group>
        </BaseHeader>
    )
}
