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
import { Link } from 'react-router-dom'
import useStyles from './Header.styles'

export const Header: React.FC= () => {
    const { classes } = useStyles()
    const { colorScheme, toggleColorScheme } = useMantineColorScheme()

    return (
        <BaseHeader
            height={50}
            p="xs"
            className={classes.wrapper}
        >
            <p className={classes.appName}>Backreez</p>
            <ul className={classes.mainNav}>
                <li className="item"><Link to="/">ダッシュボード</Link></li>
                <li className="item"><Link to="projects">プロジェクト</Link></li>
            </ul>

            <Group className={classes.subNav}>
                <ActionIcon variant="default" onClick={() => toggleColorScheme()} size={30}>
                    {colorScheme === 'dark' ? <IoSunnyOutline /> : <IoMoonOutline />}
                </ActionIcon>
                <Menu control={
                    <Group spacing="xs">
                        <Avatar radius="xl" />
                        <IoChevronDownOutline />
                    </Group>
                } gutter={12}>
                    <Menu.Item icon={<IoSettingsOutline />}>設定</Menu.Item>
                    <Menu.Item icon={<IoLogOutOutline />}>ログアウト</Menu.Item>
                </Menu>
            </Group>
        </BaseHeader>
    )
}
