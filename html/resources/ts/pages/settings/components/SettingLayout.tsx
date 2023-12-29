import React from 'react'
import { SubSidebar } from '@/components/layouts/Sidebar'
import { Outlet } from 'react-router-dom'
import { styled } from '@/stitches.config'

const Content = styled('div', {
    paddingLeft: 170,
})

export const SettingLayout: React.FC = () => {
    return (
        <>
            <SubSidebar>
                <SubSidebar.item to="">基本設定</SubSidebar.item>
                {/*<SubSidebar.item to="">ユーザー設定</SubSidebar.item>*/}
            </SubSidebar>
            <Content>
                <Outlet />
            </Content>
        </>
    )
}
