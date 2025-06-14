import { SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar'
import React from 'react'
import AppSidebar from './_component/AppSidebar'
import AppHeader from './_component/AppHeader'

const WorkspaceProvider = ({ children }) => {
    return (
        <SidebarProvider>
            <AppSidebar />

            <div className='w-full'>
                <AppHeader />
                <div className='p-10'>
                    {children}
                </div> </div>
        </SidebarProvider>
    )
}

export default WorkspaceProvider