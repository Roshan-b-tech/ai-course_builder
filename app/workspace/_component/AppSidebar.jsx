"use client"

import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarGroup,
    SidebarGroupContent,
    SidebarHeader,
    SidebarMenuButton,
    SidebarMenu,
    SidebarMenuItem,
} from "@/components/ui/sidebar"
import { Button } from '@/components/ui/button'
import { Book, Compass, LayoutDashboard, PencilRulerIcon, User, WalletCards } from 'lucide-react'
import AddNewCourseDialog from './AddNewCourseDialog'
import Profile from '../profile/page'

const SideBarOptions = [
    {
        title: 'Dashboard',
        icon: LayoutDashboard,
        path: '/workspace'
    },
    {
        title: 'My Learning',
        icon: Book,
        path: '/workspace/my-learning'

    },
    {
        title: 'Explore Courses',
        icon: Compass,
        path: '/workspace/explore'

    },

    {
        title: 'Billing',
        icon: WalletCards,
        path: '/workspace/billing'
    },
    {
        title: 'Profile',
        icon: User,
        path: '/workspace/profile'

    },
]

const AppSidebar = () => {
    const path = usePathname();
    return (
        <Sidebar>
            <SidebarHeader className={'p-4'}>
                <Image src={'/logo.svg'} alt='logo' width={130} height={120} />
            </SidebarHeader>
            <SidebarContent>
                <SidebarGroup >
                    <AddNewCourseDialog>
                        <Button>Create New Course</Button>
                    </AddNewCourseDialog>
                </SidebarGroup>
                <SidebarGroupContent>
                    <SidebarMenu>
                        {SideBarOptions.map((item, index) => (
                            <SidebarMenuItem key={index}>
                                <SidebarMenuButton asChild className={'p-5'}>
                                    <Link href={item.path} className={`text-[17px]
                                        ${path.includes(item.path) && 'text-primary bg-purple-50'}`}>
                                        <item.icon className='h-7 w-7' />
                                        <span>{item.title}</span>
                                    </Link>
                                </SidebarMenuButton>
                            </SidebarMenuItem>
                        ))}
                    </SidebarMenu>
                </SidebarGroupContent>
                <SidebarGroup />
            </SidebarContent>
            <SidebarFooter />
        </Sidebar>
    )
}

export default AppSidebar