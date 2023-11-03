import React from 'react'
import { Sidebar } from '@/components/layouts/Sidebar'
import { Outlet, useParams } from 'react-router-dom'
import {
    IoHomeOutline,
    IoBuildOutline,
    IoListOutline
} from 'react-icons/io5'
import { styled } from '@/stitches.config'

const Wrap = styled('div', {
    // display: 'flex',
    // minHeight: 'calc(100vh - 50px)',
    // margin: -25,
})

const Content = styled('div', {
    paddingLeft: 210,
})

export const ProjectLayout: React.FC = () => {
    // URLからプロジェクトキーを取得
    const { projectKey } = useParams()

    return (
        <Wrap>
            <Sidebar>
                <Sidebar.item to={`/${projectKey}/home`} icon={<IoHomeOutline />}>ホーム</Sidebar.item>
                <Sidebar.item to={`/${projectKey}/issues`} icon={<IoListOutline />}>課題</Sidebar.item>
                <Sidebar.item to={`/${projectKey}/settings`} icon={<IoBuildOutline />}>設定</Sidebar.item>
            </Sidebar>
            <Content>
                <Outlet />
            </Content>
        </Wrap>
    )
}
