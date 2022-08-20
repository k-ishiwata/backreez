import React from 'react'
import { Sidebar, NavItem } from '@/components/layouts/Sidebar'
import { useLocation, Outlet } from 'react-router-dom'
import {
    IoHomeOutline,
    IoBuildOutline,
    IoListOutline
} from 'react-icons/io5'

export const ProjectLayout: React.FC = () => {
    // URLからプロジェクトキーを取得
    const projectKey = useLocation().pathname.split('/')[1]

    return (
        <div>
            <Sidebar>
                <NavItem to={`/${projectKey}/home`} icon={<IoHomeOutline />}>ホーム</NavItem>
                <NavItem to={`/${projectKey}/issues`} icon={<IoListOutline />}>課題</NavItem>
                <NavItem to={`/${projectKey}/settings`} icon={<IoBuildOutline />}>設定</NavItem>
            </Sidebar>
            <div>
                <Outlet />
            </div>
        </div>
    )
}
