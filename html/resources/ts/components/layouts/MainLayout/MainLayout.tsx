import React from 'react'
import { Outlet } from 'react-router-dom'
import { Header } from '@/components/layouts/Header/Header'
import { AppShell } from '@mantine/core'

export const MainLayout: React.FC = () => {
    return (
        <AppShell
            // fixed
            padding={0}
            // navbar={
            //     <Navbar width={{ base: 240 }} height="100vh" p="xs">
            //         <Navbar.Section grow mt="xs">
            //             {/*<MainLinks />*/}
            //         </Navbar.Section>
            //         <Navbar.Section>
            //             {/*<User />*/}
            //         </Navbar.Section>
            //     </Navbar>
            // }
            header={<Header />}
            styles={theme => ({
                main: {
                    backgroundColor:
                        theme.colorScheme === 'dark' ? theme.colors.dark[8] : theme.colors.gray[0],
                }
            })}
        >
            <div style={{padding: 25}}>
                <Outlet />
            </div>
        </AppShell>
    )
}
