import { UserButton } from '@clerk/nextjs'
import React from 'react'
import { SidebarTrigger } from '@/components/ui/sidebar'

const AppHeader = ({ hideSidebar = false }) => {
    return (
        <div className='p-4 flex justify-between items-center'>
            {!hideSidebar && <SidebarTrigger />}
            <UserButton />
        </div>
    )
}

export default AppHeader