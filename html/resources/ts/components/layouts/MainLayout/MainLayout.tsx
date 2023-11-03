import React from 'react'
import { Outlet } from 'react-router-dom'
import { Header } from '@/components/layouts/Header/Header'
import { styled } from '@/stitches.config'

const Wrap = styled('div', {
    paddingTop: 50,
})

export const MainLayout: React.FC = () => {
    return (
        <Wrap>
            <Header />
            <div style={{padding: 25}}>
                <Outlet />
            </div>
        </Wrap>
    )
}
