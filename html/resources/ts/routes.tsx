import React from 'react'
import type { RouteObject } from 'react-router-dom'
import { MainLayout } from '@/components/layouts/MainLayout'
import DashboardPage from '@/pages/dashboard'
import ProjectsPage from '@/pages/projects'

export const routes: RouteObject[] = [
    {
        path: '/',
        element: <MainLayout />,
        children: [
            {
                index: true,
                element: <DashboardPage />
            }, {
                path: '/projects',
                element: <ProjectsPage />
            }
        ]
    }
]
