import React from 'react'
import type { RouteObject } from 'react-router-dom'
import { MainLayout } from '@/components/layouts/MainLayout'
import { ProjectLayout } from '@/components/layouts/ProjectLayout'
import DashboardPage from '@/pages/dashboard'
import ProjectsPage from '@/pages/projects'
import HomePage from '@/pages/home'
import IssuesPage from '@/pages/issues'
import SettingsPage from '@/pages/settings'

export const routes: RouteObject[] = [
    {
        path: '/',
        element: <MainLayout />,
        children: [
            {
                index: true,
                element: <DashboardPage />
            }, {
                path: 'projects',
                element: <ProjectsPage />
            }, {
                path: ':projectId',
                element: <ProjectLayout />,
                children: [
                    {
                        path: 'home',
                        element: <HomePage />
                    }, {
                        path: 'issues',
                        element: <IssuesPage />
                    }, {
                        path: 'settings',
                        element: <SettingsPage />
                    }
                ]
            }
        ]
    }
]
