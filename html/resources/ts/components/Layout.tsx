import React from 'react'
import { NavLink, Outlet } from 'react-router-dom'

const Layout: React.FC = () => {
    return (
        <div>
            <ul className="nav">
                <li><NavLink to="/">ダッシュボード</NavLink></li>
                <li><NavLink to="/projects">プロジェクト</NavLink></li>
            </ul>
            <Outlet/>
        </div>
    )
}

export default Layout
