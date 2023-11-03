import React, { useLayoutEffect, useState } from 'react'
import {
    Wrap,
    AppName,
    MainNavi,
    SubNavi,
} from './styles'
import { IconButton } from '@/components/IconButton'
import { Group } from '@/components/layouts'
import { Avatar } from '@/components/Avatar'
import {
    IoMoonOutline,
    IoSunnyOutline,
    IoLogOutOutline,
    IoSettingsOutline,
    IoChevronDownOutline
} from 'react-icons/io5'
import { NavLink } from 'react-router-dom'
import { useLogout } from "@/queries/authQuery"
import { darkTheme } from '@/stitches.config'

import { DropdownMenu } from '@/components/DropdownMenu'

export const Header: React.FC= () => {
    const logout = useLogout()

    const [isDarkTheme, setIsDarkTheme] = useState(false)

    useLayoutEffect(() => {
        const { classList } = document.body
        isDarkTheme
            ? classList.add(darkTheme)
            : classList.remove(darkTheme)
    }, [isDarkTheme])

    const handleLogout = () => logout.mutate()

    return (
        <Wrap>
            <AppName>Backreez</AppName>
            <MainNavi>
                <li><NavLink to="/">ダッシュボード</NavLink></li>
                <li><NavLink to="projects">プロジェクト</NavLink></li>
            </MainNavi>

            <SubNavi>
                <IconButton
                    onClick={() => setIsDarkTheme(! isDarkTheme)}>
                    { isDarkTheme ? <IoSunnyOutline /> : <IoMoonOutline /> }
                </IconButton>

                <DropdownMenu>
                    <DropdownMenu.Trigger>
                        <Group css={{gap: 0}}>
                            <Avatar css={{backgroundImage: 'url(https://i.pravatar.cc/100)'}} />
                            <IoChevronDownOutline />
                        </Group>
                    </DropdownMenu.Trigger>
                    <DropdownMenu.Content position="left">
                        <DropdownMenu.Item icon={<IoSettingsOutline />}>設定</DropdownMenu.Item>
                        <DropdownMenu.Item icon={<IoLogOutOutline />} onClick={handleLogout}>ログアウト</DropdownMenu.Item>
                    </DropdownMenu.Content>
                </DropdownMenu>
            </SubNavi>
        </Wrap>
    )
}
