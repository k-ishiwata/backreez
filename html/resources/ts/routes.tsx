import React from 'react'
import type { RouteObject } from 'react-router-dom'
import Layout from '@/components/Layout'
import DashboardPage from '@/pages/dashboard'
import ProjectsPage from '@/pages/projects'

export const routes: RouteObject[] = [
    {
        path: '/',
        element: <Layout />,
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
