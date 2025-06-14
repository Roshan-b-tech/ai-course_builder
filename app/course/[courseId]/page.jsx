'use client'
import React, { useState, useEffect } from 'react'
import axios from 'axios'
import AppHeader from '@/app/workspace/_component/AppHeader'
import ChapterListSidebar from '../_component/ChapterListSidebar'
import ChapterContent from '../_component/ChapterContent'
import { useParams } from 'next/navigation'

function Course() {
    const { courseId } = useParams();
    const [courseInfo, setCourseInfo] = useState();
    const [sidebarOpen, setSidebarOpen] = useState(false);
    useEffect(() => {
        GetEnrolledCourseById();
    }, [])
    const GetEnrolledCourseById = async () => {
        try {
            const result = await axios.get('/api/enroll-course?courseId=' + courseId);
            console.log('API Response:', result.data);
            setCourseInfo(result.data);
        } catch (error) {
            console.error('Error fetching course:', error);
        }
    }
    return (
        <div className='relative min-h-screen w-full bg-background overflow-x-hidden'>
            {/* Fixed Header */}
            <div className='fixed top-0 left-0 w-full z-50 h-16 shadow-md bg-white flex items-center'>
                <button className="md:hidden ml-2 mr-4" onClick={() => setSidebarOpen((open) => !open)}>
                    <svg width="32" height="32" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" /></svg>
                </button>
                <AppHeader hideSidebar={true} />
            </div>
            {/* Sidebar for desktop */}
            <div className='hidden md:block fixed top-16 left-0 h-[calc(100vh-4rem)] w-80 z-20 border-r bg-secondary'>
                <ChapterListSidebar courseInfo={courseInfo} />
            </div>
            {/* Sidebar Drawer for mobile/tablet */}
            {sidebarOpen && (
                <div className="fixed inset-0 z-40 flex">
                    {/* Overlay that closes the sidebar on click */}
                    <div className="fixed inset-0 bg-black opacity-30" onClick={() => setSidebarOpen(false)}></div>
                    {/* Sidebar Drawer */}
                    <div className="relative w-full max-w-xs bg-secondary h-full shadow-xl z-50 flex flex-col overflow-x-hidden">
                        {/* Close button at the top right, always visible and distinct */}
                        <div className="flex justify-end items-center p-2 border-b border-gray-200 bg-white z-20">
                            <button
                                onClick={() => setSidebarOpen(false)}
                                aria-label="Close sidebar"
                                className="p-2 rounded-full hover:bg-gray-200 focus:outline-none"
                            >
                                <svg width="28" height="28" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" className="text-black">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            </button>
                        </div>
                        {/* Sidebar content scrollable */}
                        <div className="flex-1 overflow-y-auto">
                            <ChapterListSidebar courseInfo={courseInfo} />
                        </div>
                    </div>
                </div>
            )}
            {/* Scrollable Content */}
            <div className='md:ml-80 pt-20 md:pt-16 h-[calc(100vh-4rem)] overflow-y-auto bg-background px-2 sm:px-4'>
                <ChapterContent courseInfo={courseInfo} refreshData={GetEnrolledCourseById} />
            </div>
        </div>
    )
}

export default Course