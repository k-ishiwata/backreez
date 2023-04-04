import React from 'react'
import { redirect, createBrowserRouter } from 'react-router-dom'
import { getAuthUser } from '@/queries/authQuery'
import { MainLayout } from '@/components/layouts/MainLayout'
import { ProjectLayout } from '@/components/layouts/ProjectLayout'
import DashboardPage from '@/pages/dashboard'
import ProjectsPage from '@/pages/projects'
import HomePage from '@/pages/home'
import IssuesPage from '@/pages/issues'
import IssueShowPage from '@/pages/issues/show'
import SettingsPage from '@/pages/settings'
import LoginPage from '@/pages/login'

/**
 * ログイン済みのみアクセス可能
 */
const guardLoader = async () => {
    const user = await getAuthUser()
    return user ? true : redirect('/login')
}

/**
 * ログインしていない場合のみアクセス可能
 */
const guestLoader = async () => {
    const user = await getAuthUser()
    return user ? redirect('/') : true
}

export const router = createBrowserRouter([
    {
        path: 'login',
        element: <LoginPage />,
        loader: guestLoader
    }, {
        path: '/',
        element: <MainLayout />,
        loader: guardLoader,
        errorElement: <h1>404 not found</h1>,
        children: [
            {
                index: true,
                element: <DashboardPage />
            }, {
                path: 'projects',
                element: <ProjectsPage />
            }, {
                path: ':projectKey',
                element: <ProjectLayout />,
                children: [
                    {
                        path: 'home',
                        element: <HomePage />
                    }, {
                        path: 'issues',
                        children: [
                            {
                                index: true,
                                element: <IssuesPage />
                            },
                            {
                                path: ':issueId',
                                element: <IssueShowPage />
                            }
                        ]
                    }, {
                        path: 'settings',
                        element: <SettingsPage />
                    }
                ]
            }
        ]
    }
])
